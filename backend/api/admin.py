from django.contrib import admin
from .models import Connect

@admin.register(Connect)
class ConnectAdmin(admin.ModelAdmin):
    list_display = ('name', 'phoneNumber', 'email', 'message', 'messageAt')  # Display fields in the list view
    search_fields = ('name', 'phoneNumber', 'email')  # Searchable fields in the admin interface
