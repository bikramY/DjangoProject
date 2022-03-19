from email import message
from django.shortcuts import render, HttpResponse
from Home.models import Contact
from datetime import datetime
# Create your views here.
def index(request):
    # return HttpResponse("Hello this is a home page")
    return render(request,'index.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    if request.method=='POST':
        name=request.POST.get('name')
        address=request.POST.get('address')
        email=request.POST.get('email')
        issue=request.POST.get('issue')
        date= datetime.today()
        contact= Contact(name=name,address=address,email=email,issue=issue,date=date)
        contact.save()
        
        

    return render(request,'contact.html')


