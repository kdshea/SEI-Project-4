from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import DocumentSerializer
from .models import Document
from jobs.models import Job

# Create your views here.

class DocumentListView(APIView):
    permission_classes = [IsAuthenticated]    
    
    # Get all documents
    def get(self, request):
      print('request.user ->', request.user)
      documents = Document.objects.filter(owner=request.user)
      serialized_documents = DocumentSerializer(documents, many=True)
      print('documents ->', serialized_documents)
      return Response(serialized_documents.data, status=status.HTTP_200_OK)

    def post(self, request):
        document_to_create = DocumentSerializer(data=request.data) 
        try:
            document_to_create.is_valid(True)
            document_to_create.save() 
            return Response(document_to_create.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# Single document view
class DocumentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_document(self, pk):
        try:
            return Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            raise NotFound("Document not found.")
    # GET
    # Get document by id
    def get(self, request, pk):
        document = self.get_document(pk=pk)
        if document.owner != request.user:
          raise PermissionDenied("Unauthorized")
        serialized_document = DocumentSerializer(document)
        return Response(serialized_document.data)

    # UPDATE
    def put(self, request, pk):
      document_to_update = self.get_document(pk=pk)
      if document_to_update.owner != request.user:
        raise PermissionDenied("Unauthorized")
      updated_document = DocumentSerializer(document_to_update, data=request.data) 
      try:
          updated_document.is_valid(True)
          updated_document.save()
          return Response(updated_document.data, status=status.HTTP_202_ACCEPTED)
      except Exception as e:
          print(e)
          return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

      
    # DELETE
    def delete(self, request, pk):
        document_to_delete = self.get_document(pk)
        if document_to_delete.owner != request.user:
            raise PermissionDenied("Unauthorized")
        document_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DocumentByJobView(APIView):
    permission_classes = [IsAuthenticated]

    def get_job(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound("Job not found.")

    def get_document(self, pk):
        try:
            return Document.objects.filter(job=pk)
        except Document.DoesNotExist:
            raise NotFound("Document not found!")
            
    # GET
    # Get documents by job id
    def get(self, request, pk):
        job = self.get_job(pk)
        if job.owner != request.user:
          raise PermissionDenied("Unauthorized")
        documents = self.get_document(pk)
        serialized_documents = DocumentSerializer(documents.filter(owner=request.user), many=True)
        return Response(serialized_documents.data)