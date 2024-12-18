from django.db import models

# Create your models here.
class Connect(models.Model): 
    name = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=15)
    email = models.EmailField()
    message = models.TextField()
    messageAt = models.DateTimeField(auto_now_add=True)