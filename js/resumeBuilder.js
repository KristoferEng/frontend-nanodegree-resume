var data = {
	
	"bio": {
		"name": "Kristofer Eng",
		"role": "Front-End Web Developer",
		"contacts": {
		  "mobile": "650-665-0579",
		  "email": "slikqaz@gmail.com",
		  "github": "https://github.com/slikqaz",
		  "twitter": "https://twitter.com/KristoferEng",
		  "location": "San Francisco, CA"
		},
		"welcomeMessage": "Live life.",
		"skills": ["HTML", "CSS", "Javascript", "jQuery", "Excel", "PowerPoint"],
		"bioPic": "https://pbs.twimg.com/profile_images/3607918239/a694b77b3a7f95145dba542b82c0a768_400x400.jpeg"
	},

	"education": {
		"schools": [
			{
				"name": "University of Pennsylvania",
				"location": "Philadelphia, PA",
				"degree": "BS",
				"majors": ["EE"],
				"dates": 2008,
				"url": "http://www.ese.upenn.edu/"
			}
		],
		"onlineCourses": [
			{
			  "title": "Intro To HTML and CSS",
			  "school": "Udacity",
			  "dates": 2015,
			  "url": "https://www.udacity.com/course/ud304" 
			},
			{
			  "title": "Responsive Web Design Fundamentals",
			  "school": "Udacity",
			  "dates": 2015,
			  "url": "https://www.udacity.com/course/ud893" 
			}
		]
	},

	"work": {
		"jobs": [
			{
				"employer": "Tenth Avenue Holdings, LLC",
				"title": "Associate",
				"location": "New York, NY",
				"dates": "2010-2015",
				"description": "Financial Analyst"
			},
			{
				"employer": "Lazard",
				"title": "Analyst",
				"location": "Boston, MA",
				"dates": "2008-2010",
				"description": "Financial Analyst"
			}
		]
	},

	"projects": {
		"projects": [
			{
				"title": "Responsive Website Project",
				"dates": "2015",
				"description": "Understanding how to create a responsive website",
				"images": ["images/project1.jpg"]
			},
			{
				"title": "Resume Project",
				"dates": "2015",
				"description": "Understanding how to use Javascript and jQuery",
				"images": ["images/project2.jpg"]
			}
		]
	}
};

var octopus = {
	
	init: function(){
		view.init();
	},

	getBio: function(){
		return data.bio;
	},

	getEducation: function(){
		return data.education;
	},

	getWork: function(){
		return data.work;
	},

	getProjects: function(){
		return data.projects;
	}

};

var view = {
	init: function(){

		//Store for later use
		this.bio = octopus.getBio();
		this.work = octopus.getWork();
		this.projects = octopus.getProjects();
		this.education = octopus.getEducation();

		//Append bio to resume
		this.appendBio();

		//Append work to resume
		this.appendWork();

		//Append projects to resume
		this.appendProjects();

		//Append education to resume
		this.appendEducation();

		//Append online classes to resume
		this.appendOnlineClasses();

		//Append map
		$("#mapDiv").append(googleMap);
	},

	prependResume: function(idTag, formattedVar, value) {
		var formatted = formattedVar.replace("%data%", value);
		$(idTag).prepend(formatted);
	},

	appendResume: function(idTag, formattedVar, value) {
		var formatted = formattedVar.replace("%data%", value);
		$(idTag).append(formatted);
	},

	appendBio: function() {
		//Add name and role
		this.prependResume("#header", HTMLheaderRole, this.bio.role);
		this.prependResume("#header", HTMLheaderName, this.bio.name);

		//Add contact information
		this.prependResume("#topContacts", HTMLgithub, this.bio.contacts.github);
		this.prependResume("#topContacts", HTMLtwitter, this.bio.contacts.twitter);
		this.prependResume("#topContacts", HTMLmobile, this.bio.contacts.mobile);
		this.prependResume("#topContacts", HTMLemail, this.bio.contacts.email);

		//Add resume picture and welcome message
		this.appendResume("#header", HTMLbioPic, this.bio.bioPic);
		this.appendResume("#header", HTMLwelcomeMsg, this.bio.welcomeMessage);

		//Add skills through separate method
		this.displaySkills();

		//Add internationalize button
		$("#header").append(internationalizeButton);
	},

	displaySkills: function() {
		var skills = this.bio.skills;

		if (skills.length > 0) {
			$("#header").append(HTMLskillsStart);
		};

		for (var i=0; i<skills.length; i++) {
			this.appendResume("#skills", HTMLskills, skills[i]);
		};
	},

	appendWork: function() {
		var jobs = this.work.jobs;

		for (job in jobs) {
			$("#workExperience").append(HTMLworkStart);

			//Append combo of employer and title
			var combined = HTMLworkEmployer.replace("%data%", jobs[job].employer) + HTMLworkTitle.replace("%data%", jobs[job].title);
			$(".work-entry:last").append(combined);

			//Append dates, location, and description
			this.appendResume(".work-entry:last", HTMLworkDates,jobs[job].dates);
			this.appendResume(".work-entry:last", HTMLworkLocation,jobs[job].location);
			this.appendResume(".work-entry:last", HTMLworkDescription,jobs[job].description);
		}	
	},

	appendProjects: function() {
		this.projectsList = this.projects.projects;

		for (project in this.projectsList) {
			$("#projects").append(HTMLprojectStart);

			//Append project title
			this.appendResume(".project-entry:last", HTMLprojectTitle, this.projectsList[project].title);
			this.appendResume(".project-entry:last", HTMLprojectDates, this.projectsList[project].dates);
			this.appendResume(".project-entry:last", HTMLprojectDescription, this.projectsList[project].description);

			//Append project images
			this.appendProjectImages(project);
		};


	},

	appendProjectImages: function(project) {
		if (this.projectsList[project].images.length > 0) {
			for (image in this.projectsList[project].images) {
				this.appendResume(".project-entry:last", HTMLprojectImage, this.projectsList[project].images[image]);
			}
		};
	},

	appendEducation: function(){
		this.schools = this.education.schools;

		for (school in this.schools) {
			$("#education").append(HTMLschoolStart);

			//Append name and degree
			var combined = HTMLschoolName.replace("%data%", this.schools[school].name) + HTMLschoolDegree.replace("%data%", this.schools[school].degree);
			$(".education-entry:last").append(combined);

			//Append dates and location
			this.appendResume(".education-entry:last", HTMLschoolDates, this.schools[school].dates);
			this.appendResume(".education-entry:last", HTMLschoolLocation, this.schools[school].location);

			//Append majors
			for (major in this.schools[school].majors) {
				this.appendResume(".education-entry:last", HTMLschoolMajor, this.schools[school].majors[major]);
			}
		}
	},

	appendOnlineClasses: function(){
		this.onlineCourses = this.education.onlineCourses;

		$("#education").append(HTMLonlineClasses);

		for (onlineCourse in this.onlineCourses) {
			$("#education").append(HTMLschoolStart);

			var combined = HTMLonlineTitle.replace("%data%", this.onlineCourses[onlineCourse].title) + HTMLonlineSchool.replace("%data%", this.onlineCourses[onlineCourse].school);
			$(".education-entry:last").append(combined);

			this.appendResume(".education-entry:last", HTMLonlineDates, this.onlineCourses[onlineCourse].dates);
			this.appendResume(".education-entry:last", HTMLonlineURL, this.onlineCourses[onlineCourse].url);

		}

	},

	inName: function(name) {
  var name2 = name.trim().split(" ");
  name2[1] = name2[1].toUpperCase();
  name2[0] = name2[0].slice(0,1).toUpperCase() + name2[0].slice(1).toLowerCase();
  return name2[0] + " " + name2[1];
	}

};

octopus.init();






