from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import get_template
from django.template import Template, Context
from django.http import Http404, HttpResponse
import datetime
from pymongo import MongoClient
from rest_framework.decorators import api_view
from rest_framework.response import Response

def get_gmi_fees(start_date, end_date):
    tmp_mongo_connstr = 'mongodb://tmqr:tmqr@10.0.1.2/client-gmi?authMechanism=SCRAM-SHA-1'
    tmp_mongo_db = 'client-gmi'

    mongoClient = MongoClient(tmp_mongo_connstr)
    db = mongoClient[tmp_mongo_db]
    collection = db.accountdatacollection

    accountdata_list_out = [];
    account_summary = {};
    office_summary = {};

    for accountdata in collection.find({'Batchid': {'$gte': start_date, '$lte': end_date}}):

        acct_key = (accountdata['FCM'], accountdata['Office'], accountdata['Account']);

        if acct_key in account_summary:
            account_summary[acct_key]['TradedQuantityBuy'] += accountdata['TradedQuantityBuy'];
            account_summary[acct_key]['TradedQuantitySell'] += accountdata['TradedQuantitySell'];
            account_summary[acct_key]['Commission'] += accountdata['Commission'];
            account_summary[acct_key]['ClearingFees'] += accountdata['ClearingFees'];
            account_summary[acct_key]['ExchangeFees'] += accountdata['ExchangeFees'];
            account_summary[acct_key]['NFAFees'] += accountdata['NFAFees'];
            account_summary[acct_key]['BrokerageFees'] += accountdata['BrokerageFees'];
            account_summary[acct_key]['TradeProcessingFees'] += accountdata['TradeProcessingFees'];
            account_summary[acct_key]['CBOT_Globex_Fee'] += accountdata['CBOT_Globex_Fee'];
            account_summary[acct_key]['CME_Globex_Fee'] += accountdata['CME_Globex_Fee'];
            account_summary[acct_key]['Give_In_Fee'] += accountdata['Give_In_Fee'];
            account_summary[acct_key]['TotalFees'] += accountdata['TotalFees'];
            account_summary[acct_key]['SumOfFeesAndCommission'] += accountdata['Commission'] + accountdata['TotalFees'];

        else:
            account_summary[acct_key] = accountdata;
            account_summary[acct_key]['SumOfFeesAndCommission'] = 0;

    for accountdata in collection.find({'Batchid': {'$gte': start_date, '$lte': end_date}}):

        office_key = (accountdata['FCM'], accountdata['Office']);

        if office_key in office_summary:
            office_summary[office_key]['TradedQuantityBuy'] += accountdata['TradedQuantityBuy'];
            office_summary[office_key]['TradedQuantitySell'] += accountdata['TradedQuantitySell'];
            office_summary[office_key]['Commission'] += accountdata['Commission'];
            office_summary[office_key]['ClearingFees'] += accountdata['ClearingFees'];
            office_summary[office_key]['ExchangeFees'] += accountdata['ExchangeFees'];
            office_summary[office_key]['NFAFees'] += accountdata['NFAFees'];
            office_summary[office_key]['BrokerageFees'] += accountdata['BrokerageFees'];
            office_summary[office_key]['TradeProcessingFees'] += accountdata['TradeProcessingFees'];
            office_summary[office_key]['CBOT_Globex_Fee'] += accountdata['CBOT_Globex_Fee'];
            office_summary[office_key]['CME_Globex_Fee'] += accountdata['CME_Globex_Fee'];
            office_summary[office_key]['Give_In_Fee'] += accountdata['Give_In_Fee'];
            office_summary[office_key]['TotalFees'] += accountdata['TotalFees'];
            office_summary[office_key]['SumOfFeesAndCommission'] += accountdata['Commission'] + accountdata[
                'TotalFees'];

        else:
            office_summary[office_key] = accountdata;
            office_summary[office_key]['Office'] = "Summary " + choose_fcm_name(accountdata['FCM']) + " " + accountdata['Office']
            office_summary[office_key]['SumOfFeesAndCommission'] = 0;

            # accountSummary

    for key, value in account_summary.items():
        quotes_context = {
            'FCM': choose_fcm_name(value['FCM']),
            'Office': value['Office'],
            'Account': value['Account'],
            'TradedQuantityBuy': value['TradedQuantityBuy'],
            'TradedQuantitySell': value['TradedQuantitySell'],
            'Commission': round(value['Commission'],2),
            'ClearingFees': round(value['ClearingFees'],2),
            'ExchangeFees': round(value['ExchangeFees'],2),
            'TransactionFees': round(value['TransactionFees'],2),
            'NFAFees': round(value['NFAFees'],2),
            'BrokerageFees': round(value['BrokerageFees'],2),
            'TradeProcessingFees': round(value['TradeProcessingFees'],2),
            'CBOT_Globex_Fee': round(value['CBOT_Globex_Fee'],2),
            'CME_Globex_Fee': round(value['CME_Globex_Fee'],2),
            'Give_In_Fee': round(value['Give_In_Fee'],2),
            'TotalFees': round(value['TotalFees'],2),
            'SumOfFeesAndCommission': round(value['SumOfFeesAndCommission'],2),
        }

        print(quotes_context);

        accountdata_list_out.append(quotes_context);

    for key, value in office_summary.items():
        quotes_context = {
            'FCM': choose_fcm_name(value['FCM']),
            'Office': value['Office'],
            'Account': value['Account'],
            'TradedQuantityBuy': value['TradedQuantityBuy'],
            'TradedQuantitySell': value['TradedQuantitySell'],
            'Commission': round(value['Commission'], 2),
            'ClearingFees': round(value['ClearingFees'], 2),
            'ExchangeFees': round(value['ExchangeFees'], 2),
            'TransactionFees': round(value['TransactionFees'], 2),
            'NFAFees': round(value['NFAFees'], 2),
            'BrokerageFees': round(value['BrokerageFees'], 2),
            'TradeProcessingFees': round(value['TradeProcessingFees'], 2),
            'CBOT_Globex_Fee': round(value['CBOT_Globex_Fee'], 2),
            'CME_Globex_Fee': round(value['CME_Globex_Fee'], 2),
            'Give_In_Fee': round(value['Give_In_Fee'], 2),
            'TotalFees': round(value['TotalFees'], 2),
            'SumOfFeesAndCommission': round(value['SumOfFeesAndCommission'], 2),
        }

        #print(quotes_context);

        accountdata_list_out.append(quotes_context)



    return accountdata_list_out

def choose_fcm_name(fcm_code):
    fcm_name_list = {'1':'ADM',
                  '2': 'RCG',
                  '4': 'WEDBUSH',};

    if fcm_code in fcm_name_list:
        return fcm_name_list[fcm_code];
    else:
        return fcm_code;

def get_account_performance(start_date, end_date):
    tmp_mongo_connstr = 'mongodb://tmqr:tmqr@10.0.1.2/client-gmi?authMechanism=SCRAM-SHA-1'
    tmp_mongo_db = 'client-gmi'

    mongoClient = MongoClient(tmp_mongo_connstr)
    db = mongoClient[tmp_mongo_db]
    collection = db.accountsummarycollection

    accountdata_list_out = [];

    for accountdata in collection.find({'Batchid': {'$gte': start_date, '$lte': end_date}}):

        if(accountdata['SummaryDetailFlag'] == 'D'
           or (accountdata['SummaryDetailFlag'] == 'S' and accountdata['AccountType'] == '9Z') ):

            quotes_context = {
                'FCM': choose_fcm_name(accountdata['FCM']),
                'SummaryDetailFlag': accountdata['SummaryDetailFlag'],
                'Ccy': accountdata['Ccy'],
                'Firm': accountdata['Firm'],
                'Office': accountdata['Office'],
                'Account': accountdata['Account'],
                'Batchid': accountdata['Batchid'],
                'AccountType': accountdata['AccountType'],
                'Commission': round(accountdata['Commission'], 2),
                'TotalFees': round(accountdata['TotalFees'], 2),
                'TransactionsCommissionsFees': round(accountdata['TransactionsCommissionsFees'], 2),
                'TradedQuantityBuy': round(accountdata['TradedQuantityBuy'], 2),
                'TradedQuantitySell': round(accountdata['TradedQuantitySell'], 2),
                'CurrentPosition': round(accountdata['CurrentPosition'], 2),
                'TotalEquity': round(accountdata['TotalEquity'], 2),
                'CurrentOV': round(accountdata['CurrentOV'], 2),
                'ChangeInAV_At_MD_Converted': round(accountdata['ChangeInAV_At_MD_Converted'], 2),
                'ConvertedAccountValueAtMarket': round(accountdata['ConvertedAccountValueAtMarket'], 2),
                'ConvertedPriorAccountValueAtMarket': round(accountdata['ConvertedPriorAccountValueAtMarket'], 2),
                'ConvertedChangeInAccountValueAtMarket': round(accountdata['ConvertedChangeInAccountValueAtMarket'], 2),
                'InitialMarginRequirement': round(accountdata['InitialMarginRequirement'], 2),
                'MaintenanceMarginRequirement': round(accountdata['MaintenanceMarginRequirement'], 2),
                'MarginExcess': round(accountdata['MarginExcess'], 2),
                'SecurityMasterID': accountdata['SecurityMasterID'],
                'SectorId': accountdata['SectorId'],
                'Sector': accountdata['Sector'],
                'SecurityMasterDesc': accountdata['SecurityMasterDesc'],
            }

            accountdata_list_out.append(quotes_context);

    return accountdata_list_out




# Create your views here.

@api_view(['GET'])
def view_fcm_fees(request, start_date, end_date):

    context = {
        'page_name': 'GMI Fees',
        'fee_info': get_gmi_fees(start_date, end_date)
    }
    return Response(context)

@api_view(['GET'])
def view_account_performance(request, start_date, end_date):

    context = {
        'page_name': 'Account Performance',
        'account_info': get_account_performance(start_date, end_date)
    }
    return Response(context)

