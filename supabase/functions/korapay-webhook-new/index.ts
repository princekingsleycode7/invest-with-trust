import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    console.log('Received webhook:', JSON.stringify(body, null, 2))

    // Handle successful payment
    if (body.event === 'charge.success') {
      const { reference, amount } = body.data
      console.log('Processing successful payment:', { reference, amount })
      
      // Initialize Supabase client
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      // Update investment status
      const { data: investment, error: fetchError } = await supabase
        .from('investments')
        .select('id, user_id')
        .eq('korapay_reference', reference)
        .single()

      if (fetchError) {
        console.error('Error fetching investment:', fetchError)
        throw new Error('Investment not found')
      }

      console.log('Found investment:', investment)

      // Update to active
      const { error: updateError } = await supabase
        .from('investments')
        .update({ status: 'active' })
        .eq('id', investment.id)

      if (updateError) {
        console.error('Error updating investment:', updateError)
        throw new Error('Failed to update investment')
      }

      console.log('Updated investment status to active')

      // Update total invested
      const { error: profileError } = await supabase.rpc('increment_total_invested', {
        user_id_param: investment.user_id,
        amount_param: amount
      })

      if (profileError) {
        console.error('Error updating profile:', profileError)
      } else {
        console.log('Updated total invested amount')
      }

      console.log('Successfully processed payment:', reference)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
