from .common import ActivitySerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedActivitySerializer(ActivitySerializer):
    owner = UserSerializer()