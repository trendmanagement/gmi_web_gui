from django.conf.urls import url, include
from django.contrib import admin
from tmqr_backend.views import *

urlpatterns = [
    url(r"^gmifees/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})$", view_fcm_fees, name='gmi_fees'),
    url(r"^gmiaccountperformance/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})$", view_account_performance, name='gmi_accounts'),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]