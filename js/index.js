const signInButton = document.getElementById('sign-in-button');
const signOutButton = document.getElementById('sign-out-button')
const signInStatus = document.getElementById('sign-in-status');
const main = document.getElementsByClassName('main')[0];
const loader = document.getElementsByClassName('loader')[0];
const alert = document.getElementsByClassName('alert')[0];
const modal = document.getElementsByClassName('modal')[0];
const yesButton = document.getElementsByClassName('yes')[0];
const noButton = document.getElementsByClassName('no')[0];
const submitButton = document.getElementsByClassName('submit-button')[0];

submitButton.addEventListener('click', () => {
	modal.style.display = 'flex';
});

yesButton.addEventListener('click', () => {
	submitVotes();
	modal.style.display = 'none';
});

noButton.addEventListener('click', () => {
	modal.style.display = 'none';
});

signInButton.addEventListener('click', () => {
	window.location.href = "./login.php";
});

signOutButton.addEventListener('click', () => {
	firebase.auth().signOut().then(() => {
	})
});

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		signOutButton.style.display = 'flex';
		signInButton.style.display = 'none';
		signInStatus.textContent = 'تم الدخول بإستخدام ' + user.email;
	} else {
		signOutButton.style.display = 'none';
		signInButton.style.display = 'flex';
		signInStatus.textContent = '';
	}
	loadVotes();
});

const loadVotes = () => {
	user = firebase.auth().currentUser;
	user != null && (uid = user.uid);

	firebase.database().ref('competitions').once('value', snapshot => {
		main.innerHTML = '';
		loader.style.display = 'block';
		snapshot.forEach(competition => {
			competitionId = competition.key;
			myVote = -1;

			votingSection = document.createElement("div");  
			votingSection.className = 'voting-section';

			competitionName = document.createElement("div");
			competitionName.className = 'small-title';
			competitionName.textContent = competition.val().name;
			
			candidatesSection = document.createElement("div");
			candidatesSection.className = 'candidates';

			if(user != null && competition.val().hasOwnProperty('participants') && competition.val().participants.hasOwnProperty(uid)) {
				myVote = competition.val().participants[uid];
			}
			competition.val().candidates.forEach((candidate, index) => {
				candidateId = Object.keys(competition.val().candidates)[index-1]
				candidateBox = document.createElement("div");
				
				if(candidate.hasOwnProperty('image')) {
					candidateImage = document.createElement('img');
					candidateImage.setAttribute('src', candidate.image);
					candidateImage.className = 'candidate-img';
					candidateBox.appendChild(candidateImage);
				}

				candidateName = document.createElement("div");
				candidateName.className = 'candidate-name';
				
				candidateName.textContent = candidate.name;
				candidateBox.appendChild(candidateName);
				if(myVote==-1) {
					candidateCheckbox = document.createElement("div");
					candidateCheckbox.className = 'pretty p-icon p-toggle p-plain';
					candidateCheckbox.innerHTML = `
						<input type="checkbox" class="candidate-checkbox" onclick="vote(${competitionId}, ${candidateId})" candidateId="${candidateId}" competitionId="${competitionId}"/>
						<div class="state p-on">
							<label>تم الإختيار</label>
						</div>
						<div class="state p-off">	
							<label>التصويت</label>
							<i class="fa fa-thumbs-up"></i>
						</div>
					`;
					candidateBox.appendChild(candidateCheckbox);
					candidateBox.setAttribute('onclick', `vote(${competitionId}, ${candidateId})`);
				}
				if(myVote!=-1&&myVote==candidateId) {
					candidateBox.className = 'candidate voted';
					votedLabel = document.createElement('label');
					votedLabel.textContent = 'تم التصويت';
					candidateBox.appendChild(votedLabel)
				} else {
					candidateBox.className = 'candidate';
				}
				
				candidatesSection.appendChild(candidateBox);
				
			});

			votingSection.appendChild(competitionName);
			votingSection.appendChild(candidatesSection);
			main.appendChild(votingSection);
		});
		
		loader.style.display = 'none';
	});
}

const vote = ((competitionId, candidateId) => {
	user = firebase.auth().currentUser;
	if(user == null)
		showAlert('يجب عليك تسجيل الدخول أولا', 'info');
	
	competitionCheckboxs = document.getElementsByClassName('candidate-checkbox');
	for (var i = 0; i < competitionCheckboxs.length; ++i) {
		checkbox = competitionCheckboxs[i];
		if(checkbox.getAttribute('competitionId')==competitionId)
			if(checkbox.getAttribute('candidateId')!=candidateId) {
				checkbox.checked = false;
				checkbox.parentElement.parentElement.className = 'candidate';
			}
		 	else
			 	if(checkbox.checked) {
					checkbox.checked = false;
					checkbox.parentElement.parentElement.className = 'candidate';
				}
				else {
					checkbox.checked = true;
					checkbox.parentElement.parentElement.className = 'candidate selected';	
				}
	}
	
});

const submitVotes = (competitionId, candidateId) => {
	user = firebase.auth().currentUser;
	if(user == null) {
		showAlert('يجب عليك تسجيل الدخول أولا', 'info');
		return;
	}
	votes = []
	try { 
		checkedCheckboxes = document.getElementsByClassName('candidate-checkbox');
		for (var i = 0; i < competitionCheckboxs.length; ++i) {
			checkbox = competitionCheckboxs[i];
			if(checkbox.checked) {
				votes.push({
					competitionId: checkbox.getAttribute('competitionId'),
					candidateId: checkbox.getAttribute('candidateId')
				});
			}
		}
	}
	catch {
	}
	if(votes.length == 0) {
		showAlert('قم بإختيار مترشح أولا', 'info');
		return;
	}
	loader.style.display = 'block';
	user.getIdToken().then(function(idToken) {  
		axios.get('./vote.php', {
			params: {	
			  idToken: idToken,
			  votes: votes
			}
		  }).then((response) => {
			loader.style.display = 'none';
			
			showAlert('تم التصويت بنجاح', 'success');
		  }, (error) => {
			loader.style.display = 'none';
			console.log(error.response)
			error.response.data.status=="already voted"?message="قمت بالتصويت بالفعل":message="خطأ";
			showAlert(message, 'warning');
		  });
	 });	

}

const showAlert = (message, type) => {
	alert.className = "alert "+type;
	alert.textContent = message;
	alert.style.opacity = "1";
	setTimeout(function(){ closeMessage(); }, 4000);
}

const closeMessage = () => {
    alert.style.opacity = "0";
    //setTimeout(function(){ alert.style.display = "none"; }, 600);
}