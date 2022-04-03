from django.contrib import admin
from django.urls import path
from Home import views

urlpatterns = [
    path("",views.index,name="Home"),
    path("about",views.about,name="about"),
    path("contact",views.contact,name="contact"),
    path("signup",views.handleSignUp,name="signup"),
    path("login",views.handleLogin,name="login"),
    path("logout",views.handleLogout,name="logout")


]
    
    

