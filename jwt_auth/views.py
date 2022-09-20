from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.contrib.auth import get_user_model
User = get_user_model()
import jwt
from datetime import datetime, timedelta
from django.conf import settings # this line imports settings as variables for using things like SECRET_KEY

from .serializers.common import UserSerializer

# Create your views here.
class RegisterView(APIView):
    
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        try:
            user_to_create.is_valid(True) 
            user_to_create.save() 
            return Response(user_to_create.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            print("FAILED AT EMAIL STAGE")
            raise PermissionDenied("Invalid credentials")

        if not user_to_login.check_password(password):
            print("FAILED AT PASSWORD STAGE")
            raise PermissionDenied("Invalid credentials")
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {
                "sub": user_to_login.id,
                "exp": int(dt.strftime('%s'))
            },
            settings.SECRET_KEY,
            "HS256"
        )

        return Response({ "token": token, "message": f"Welcome back {user_to_login.first_name}" })
