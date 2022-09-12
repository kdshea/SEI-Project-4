# Project 4


## API Apps:

### Users & Auth
  * Model
  * Serializers
  * Views
    * Register
    * Login

### Jobs
  * Model
  * Serializers
  * Views
    * Create
    * Update
    * Delete
    * Get: all, by status

### Companies
  * Model
  * Serializers
  * Views
    * Create
    * Update
    * Delete
    * Get: by id

### Activities
  * Model
  * Serializers
  * Views
    * Create
    * Update
    * Delete
    * Get: all, by due_date, by job_id, by completed_status

### Notes
  * Model
  * Serializers
  * Views
    * Create
    * Update
    * Delete
    * Get: by job_id

### Contacts
  * Model
  * Serializers
  * Views
    * Create
    * Update
    * Delete
    * Get: by job_id, by company_id

### Documents
  * Model
  * Serializers
  * Views
    * Create
    * Update
    * Delete
    * Get: by job_id


## Frontend

### Components

* Landing Page

* Register 

* Login

* Job Board (index page of all jobs)

	filter by job_status

* Activity Board (ndex of all activities)

	filter by due_date, completed_status

* Single Job Page

  (Need forms to add/edit each of these)
  * Job Details
  * Activities filtered by job_id
  * Note
  * Contacts filtered by job_id
  * Documents filtered by job_id
    * API to upload files
  * Company
    * API to import data from LinkedIn











