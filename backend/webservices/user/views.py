from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status, views
from .serializers import RegisterSerializer , EmailVerificationSerializer , LoginSerializer , RequestPasswordResetEmailSerializer, SetNewPasswordSerializer
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .utils import Util

from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

import jwt
from django.conf import settings

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode , urlsafe_base64_decode

#below imports are for the email send
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

#import util
from .utils import Util

#import renderer
from .renderers import UserRenderer

class RegisterView(generics.GenericAPIView):
    
    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer, )
    
    def post(self, request):
        user = request.data
        
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        user_data = serializer.data
        
        user = User.objects.get(email=user_data['email'])
        
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        
        relativeLink = reverse('email-verify')
        
        
        absurl = 'http://'+ current_site + relativeLink+"?token="+ str(token)        
        email_body = 'Hi ' + user.username + ' Use below link to verify your email \n' + absurl
        data = {'email_body':email_body, 'to_email': user.email , 'email_subject':'verify your email'}
        Util.sendMail(data)
        
        return Response(user_data, status=status.HTTP_201_CREATED)
 
    
    
class VerifyEmail(views.APIView):
    
    serializer_class = EmailVerificationSerializer
    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)
    
    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(id=payload['user_id'])
            
            if not user.is_verified:
                user.is_verified= True
                user.save()
            return Response({'email':'Successfully activated'}, status=status.HTTP_200_OK)
        
        except jwt.ExpiredSignatureError as error:
            return Response({'error':'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as decodeError:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
        

class LoginAPIView(generics.GenericAPIView):
    
    serializer_class=LoginSerializer
    
    def post(self, request):
        user = request.data
        serializer= self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        
        return Response(serializer.data , status = status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    
    serializer_class = RequestPasswordResetEmailSerializer
    
    def post(self, request):

        email = request.data['email']
        
        if User.objects.filter(email=email).exists():                
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode( smart_bytes(user.id) )
            
            token = PasswordResetTokenGenerator().make_token(user)
            
            #below send email code 
            current_site = get_current_site(request= request).domain
            
            relativeLink = reverse('password-reset-confirm',kwargs={'uidb64':uidb64 , 'token':token } )
            
            absurl = 'http://'+ current_site + relativeLink
            
            email_body = 'Hello, \n  Use below link to reset your password \n' + absurl     
            
            data = {'email_body':email_body, 'to_email': user.email , 'email_subject':'Password Reset Request'}              
            
            Util.sendMail(data)
            return Response({'success':'You have got link for Password Reset' } , status=status.HTTP_200_OK)
        
        return Response({'error':'Email has not been found in our database' } , status=status.HTTP_404_NOT_FOUND)

 
class PassowordTokenCheckAPI(generics.GenericAPIView):
    
    def get(self, request, uidb64, token):
        
        
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
   
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):

                return Response({"error" :"Not a Valid Token, Please request again for new token"}, status=status.HTTP_401_UNAUTHORIZED)
            
            return Response({'success':True, 'message':'Credentials are valid', 'uidb64':uidb64 , 'token':token}, status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError as e :

            return Response({"error" :"Not a Valid Request"}, status=status.HTTP_400_BAD_REQUEST)

            
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        return Response({'success':True, 'message':'Password has been changed successfully'}, status=status.HTTP_200_OK)
