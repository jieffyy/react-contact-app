from email.mime import base
from django.urls import include, path
from rest_framework import routers
from contacts.views import ContactViewSet
from auth.views import UserViewSet, GroupViewSet, LoginView, RegistrationView
from knox import views as knox_views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename=r'users')
router.register(r'groups', GroupViewSet)
router.register(r'contacts', ContactViewSet, basename=r'contacts')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api/register/', RegistrationView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]
