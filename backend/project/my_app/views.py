from django_daraja.mpesa.core import MpesaClient
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import re
import logging
from .models import Order
import json


# Initialize MpesaClient
cl = MpesaClient()

# Set up logging
logger = logging.getLogger(__name__)

def validate_phone_number(phone_number):
    return re.match(r'^(?:\+254|07)\d{8}$', phone_number) is not None

def paybill_online_payment(request):
    phone_number = request.GET.get('phone_number')

    if not phone_number or not validate_phone_number(phone_number):
        return JsonResponse({"error": "Invalid phone number provided"}, status=400)

    amount_str = request.GET.get('amount')
    amount = 1 if amount_str is None else int(float(amount_str))

    account_reference = 'reference'
    transaction_desc = 'food'
    callback_url = "https://e138-196-250-215-143.ngrok-free.app/payments/callback/"



 # Update with your actual callback URL

    # Initiate STK Push
    response = cl.stk_push(
        phone_number,
        amount,
        account_reference,
        transaction_desc,
        callback_url
    )

    response_data = {
        "ResponseCode": response.response_code,
        "ResponseDescription": response.response_description,
        "MerchantRequestID": response.merchant_request_id,
        "CheckoutRequestID": response.checkout_request_id,
    }

    return JsonResponse(response_data)

@csrf_exempt
def mpesa_callback(request):
    # Ensure you're getting JSON data from POST requests
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            logger.info("Callback Data: %s", data)

            result_code = data.get('Body', {}).get('stkCallback', {}).get('ResultCode', '')
            result_desc = data.get('Body', {}).get('stkCallback', {}).get('ResultDesc', '')
            merchant_request_id = data.get('Body', {}).get('stkCallback', {}).get('MerchantRequestID', '')
            checkout_request_id = data.get('Body', {}).get('stkCallback', {}).get('CheckoutRequestID', '')

            # Store all the necessary data in the database
            order = Order.objects.create(
                food_item="Sample Food Item",  # Replace with actual food item
                amount=100.00,  # Replace with actual amount
                mpesa_transaction_id=checkout_request_id,
                status=result_code,
                description=result_desc
            )

            logger.info(f"Order created: {order}")
        except json.JSONDecodeError:
            logger.error("Failed to decode JSON")
            return JsonResponse({"ResultCode": 1, "ResultDesc": "Invalid JSON"}, status=400)

        return JsonResponse({"ResultCode": 0, "ResultDesc": "Accepted"})
    else:
        return JsonResponse({"ResultCode": 1, "ResultDesc": "Invalid Request Method"}, status=405)
