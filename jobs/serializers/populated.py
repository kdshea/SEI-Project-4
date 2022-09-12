from .common import JobSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedJobSerializer(JobSerializer):
    owner = UserSerializer()