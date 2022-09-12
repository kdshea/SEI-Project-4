from .common import CompanySerializer
from jobs.serializers.populated import PopulatedJobSerializer

class PopulatedCompanySerializer(CompanySerializer):
    jobs = PopulatedJobSerializer(many=True)