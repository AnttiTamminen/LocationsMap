from .views import RegisterAPI, UserAPI
from django.urls import path
from knox import views as knox_views
from .views import LoginAPI
from django.urls import path, include


urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout',knox_views.LogoutView.as_view(), name="knox-logout"),
]