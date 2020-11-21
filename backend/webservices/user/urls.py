from django.urls import path
from .views import RegisterView , VerifyEmail , LoginAPIView , PassowordTokenCheckAPI, RequestPasswordResetEmail, SetNewPasswordAPIView


urlpatterns = [
        path('register/', RegisterView.as_view(), name="register"),
        path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
        path('login/', LoginAPIView.as_view(), name="login"),
        
        path('request-reset-email/',RequestPasswordResetEmail.as_view(), name="request-reset-email"  ),
        path('password-reset/<uidb64>/<token>/', PassowordTokenCheckAPI.as_view() , name='password-reset-confirm'),
        
        path('password-reset-complete/',SetNewPasswordAPIView.as_view(), name="password-reset-complete")
        
        
]