from email import message
import http
from turtle import home
from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from Home.models import Contact
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate

# Create your views here.
def index(request):
    # return HttpResponse("Hello this is a home page")
    return render(request,'index.html')

def about(request):
    return render(request,'about.html')

def handleSignUp(request):
    if request.method=='POST':
     fname = request.POST['fname']
     lname = request.POST['lname']
     email = request.POST['email']
     pass1 = request.POST['pass1']
     pass2 = request.POST['pass2']

     #checkss

     #create user

     myuser= User.objects.create_user(username=email, email=email, password=pass1)
     myuser.first_name=fname
     myuser.last_name=lname
     myuser.save()
     messages.info(request," Congratulations you have successfully created user account")
     return redirect('Home')

    #  new_user = User.objects.create(username=username, email=email, password=password)
    #  new_user = form.save(commit=False)


    else:
        return HttpResponse("404 error")

def handleLogin(request):
    loginemail= request.POST['loginemail']
    loginpassword= request.POST['loginpassword']
    user= authenticate(username=loginemail, password=loginpassword)
    if user is not None:
        login(request,user)
        messages.success(request,'logged in' )
        return redirect("Home")

    else:
        messages.warning(request,'please enter correct crediantials')
        return redirect("Home")

def handleLogout(request):
    
    logout(request)
    messages.success(request,'you have been logged out')
    return redirect('Home')
    
    return HttpResponse(handleLogout)



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


