from django.urls import path
from .views import DocumentListView, DocumentDetailView, DocumentByJobView

urlpatterns = [
  path('', DocumentListView.as_view()),
  path('<int:pk>/', DocumentDetailView.as_view()),
  path('job<int:pk>/', DocumentByJobView.as_view()),
]


