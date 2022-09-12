from django.urls import path
from .views import NoteListView, NoteDetailView, NoteByJobView

urlpatterns = [
  path('', NoteListView.as_view()),
  path('<int:pk>/', NoteDetailView.as_view()),
  path('job<int:pk>/', NoteByJobView.as_view()),
]