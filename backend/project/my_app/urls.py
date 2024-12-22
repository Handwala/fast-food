from django.urls import path
from . import views

urlpatterns = [
    path('payments/paybill-online/', views.paybill_online_payment, name='paybill_online_payment'),
    path('payments/callback/', views.mpesa_callback, name='mpesa_callback'),
]
