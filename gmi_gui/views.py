from django.http import HttpResponse  
from django.shortcuts import render

def hello(request):
    return HttpResponse("Hello world")
	
def main_page(request):
	return render(request, 'base.html')