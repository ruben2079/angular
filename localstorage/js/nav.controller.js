(function(){
	'use strict';
	angular
		.module('app')
		.controller('NavController', NavController);
		
	function NavController($http) { 
		var vm = this;
		vm.ActiveTab = ActiveTab;
		vm.Section = Section;
		vm.toggleButton = toggleButton;
		vm.cancelBtn = cancelBtn;
		vm.saveBtn = saveBtn;
		vm.allTabs = document.querySelectorAll('#nav li');
		vm.contentData = {};
		
		//Calling fake API
		var url = window.location.href.replace('index.html','') + 'api/singlepage-api.json?callback=JSON_CALLBACK';
		$http.jsonp(url)
		.success(function(data){
		   console.log('Success, API loaded.');
		   vm.contentData = data;
		})
		.error(function () {
		  console.log('Error, API not found.')
		});
		
		//Retrieve local storage
		if (typeof(localStorage.SiteInfo) !== "undefined") {
			console.log(JSON.parse(localStorage.getItem('SiteInfo')));
			document.getElementById('companyName').value = JSON.parse(localStorage.getItem('SiteInfo')).companyName;
			document.getElementById('siteTitle').value = JSON.parse(localStorage.getItem('SiteInfo')).siteTitle;
			document.getElementById('tagLine').value = JSON.parse(localStorage.getItem('SiteInfo')).tagLine;
			document.getElementById('facebookScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).facebookScreenName;
			document.getElementById('twitterScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).twitterScreenName;
			document.getElementById('linkedinScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).linkedInScreenName;
			document.getElementById('linkedinCoScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).linkedInCoScreenName;
			document.getElementById('plusGoogleScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).plusGScreenName;
			document.getElementById('youtubeScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).youtubeScreenName;
			document.getElementById('flickrScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).flickrScreenName;
			document.getElementById('vimeoScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).vimeoScreenName;
			document.getElementById('pinterestScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).pinterestScreenName;
			document.getElementById('instagramScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).instagramScreenName;
			document.getElementById('foursquareScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).fourSquareScreenName;
			document.getElementById('tumblrScreenname').value = JSON.parse(localStorage.getItem('SiteInfo')).tumblrScreenName;
		}
		
		function ActiveTab(el){
			var activeSection = el.target.id.replace("Tab", "");
			
			angular.forEach(vm.allTabs, function(value, key){
				vm.allTabs[key].removeAttribute("class");
			});
			el.target.parentNode.setAttribute("class", "active-tab");
			
			vm.Section(activeSection);
		}
		
		function Section(activeSection){
			var activeSectionId = document.getElementById(activeSection),
				allSections = document.querySelectorAll('article section');

			angular.forEach(allSections, function(value, key){
				if(allSections[key].id === activeSection){
					allSections[key].classList.remove('hidden');
					allSections[key].classList.add('activeSection');
				} else {
					allSections[key].classList.add('hidden');
					allSections[key].classList.remove('activeSection');
				}
			});
		}
		
		function toggleButton(el){
			var getActiveClass = [];
			var btnSwitch = document.querySelectorAll('.btn.btn-xs');
			var fontAwesome = document.querySelectorAll('.fa');
			
			angular.forEach(btnSwitch, function(value, key){
				btnSwitch[key].classList.add('btn-default');
				btnSwitch[key].classList.remove('btn-primary');
				btnSwitch[key].classList.remove('active');
			});
			if(el.target.innerHTML == 'ON'){
				for(var y = 0; y < fontAwesome.length; y++){
					fontAwesome[y].classList.add('coloredIcon');
				}
			} else {
				for(var z = 0; z < fontAwesome.length; z++){
					fontAwesome[z].classList.remove('coloredIcon');
				}
			}
			el.target.className = 'btn btn-xs btn-primary active';
		}
		
		function cancelBtn() {
			var getTextField = document.querySelectorAll('input[type="text"]');

			angular.forEach(getTextField, function(value, key){
				getTextField[key].vale = '';
			});
			localStorage.removeItem("SiteInfo");
			return false;
		}
		
		function saveBtn(){
			var getData = {
				companyName: document.getElementById('companyName').value,
				siteTitle: document.getElementById('siteTitle').value,
				tagLine: document.getElementById('tagLine').value,
				facebookScreenname: document.getElementById('facebookScreenname').value,
				twitterScreenName: document.getElementById('twitterScreenname').value,
				linkedInScreenName: document.getElementById('linkedinCoScreenname').value,
				linkedInCoScreenName: document.getElementById('linkedinCoScreenname').value,
				plusGScreenName: document.getElementById('plusGoogleScreenname').value,
				youtubeScreenName: document.getElementById('youtubeScreenname').value,
				flickrScreenName: document.getElementById('flickrScreenname').value,
				vimeoScreenName: document.getElementById('vimeoScreenname').value,
				pinterestScreenName: document.getElementById('pinterestScreenname').value,
				instagramScreenName: document.getElementById('instagramScreenname').value,
				fourSquareScreenName: document.getElementById('foursquareScreenname').value,
				tumblrScreenName: document.getElementById('tumblrScreenname').value
			};
			localStorage.setItem("SiteInfo", JSON.stringify(getData));
			return false;
		}
	}
})();