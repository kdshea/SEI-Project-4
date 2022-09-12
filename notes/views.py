from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import NoteSerializer
from .models import Note
from jobs.models import Job

# Create your views here.

class NoteListView(APIView):
    # Get all notes
    def get(self, request):
      print('request.user ->', request.user)
      notes = Note.objects.filter(owner=request.user)
      serialized_notes = NoteSerializer(notes, many=True)
      print('notes ->', serialized_notes)
      return Response(serialized_notes.data, status=status.HTTP_200_OK)

    def post(self, request):
        note_to_create = NoteSerializer(data=request.data) 
        try:
            note_to_create.is_valid(True)
            note_to_create.save() 
            return Response(note_to_create.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# Single note view
class NoteDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_note(self, pk):
        try:
            return Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            raise NotFound("Note not found!")
    # GET
    # Get note by id
    def get(self, request, pk):
        note = self.get_note(pk=pk)
        if note.owner != request.user:
          raise PermissionDenied("Unauthorized")
        serialized_note = NoteSerializer(note)
        return Response(serialized_note.data)

    # UPDATE
    def put(self, request, pk):
      note_to_update = self.get_note(pk=pk)
      if note_to_update.owner != request.user:
          raise PermissionDenied("Unauthorized")
      updated_note = NoteSerializer(note_to_update, data=request.data) 
      try:
          updated_note.is_valid(True)
          updated_note.save()
          return Response(updated_note.data, status=status.HTTP_202_ACCEPTED)
      except Exception as e:
          print(e)
          return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # DELETE
    def delete(self, request, pk):
        note_to_delete = self.get_note(pk)
        if note_to_delete.owner != request.user:
            raise PermissionDenied("Unauthorized")
        note_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NoteByJobView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    def get_job(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound("Job not found.")

    def get_note(self, pk):
        try:
            return Note.objects.filter(job=pk)
        except Note.DoesNotExist:
            raise NotFound("No notes found for this job")
    # GET
    # Get notes by job id
    def get(self, request, pk):
        job = self.get_job(pk)
        if job.owner != request.user:
          raise PermissionDenied("Unauthorized")
        notes = self.get_note(pk)
        serialized_notes = NoteSerializer(notes.filter(owner=request.user), many=True)
        return Response(serialized_notes.data)