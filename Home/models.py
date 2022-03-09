from operator import mod
from pyexpat import model
from django.db import models

# Create your models here.
class Contact(models.Model):
    name=models.CharField(max_length=50)
    address=models.CharField(max_length=55)
    email=models.EmailField(max_length=50)
    issue=models.TextField()
    date=models.DateField()

    def __str__(self):
        return self.name


