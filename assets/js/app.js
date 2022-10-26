document.addEventListener('DOMContentLoaded', function() {
  const page = document.querySelector('.page');
  const header = document.querySelector('.header');
  const section = document.querySelector('.section');

  // allows users to toggle content editing ability
  document.getElementById('contentsControl').addEventListener('click', function() {
    if (page.isContentEditable) {
      page.contentEditable = false;
      this.innerHTML = 'Unlock Contents Editing';
    } else {
      page.contentEditable = true;
      this.innerHTML = 'Lock Contents Editing';
    }
  });

  // allows users to add new sections to the resume
  let addedSections = [];
  let hrs = [];
  document.getElementById('addSection').addEventListener('click', function() {
    if (addedSections.length < 3) {
      const hr = document.createElement('hr');
      const clone = section.cloneNode(true);
      clone.classList.remove('section');
      
      page.append(hr);
      page.append(clone);
      
      addedSections.push(clone);
      hrs.push(hr);
    }
  });

  // allows users to remove added sections
  document.getElementById('removeSection').addEventListener('click', function() {
    if (addedSections.length > 0) {
      addedSections.pop().remove();
      hrs.pop().remove();
    }
  });
  
  function setupGeneralControls() {
    const generalControls = document.getElementById('margin-controls');
    generalControls.addEventListener('input', function(event) {
      const target = event.target;
      switch(target.id) {
        case 'horizontal-margins':
          page.style.paddingLeft = target.value + 'rem';
          page.style.paddingRight = target.value + 'rem';
          break;
        case 'vertical-margins':
          page.style.paddingTop = target.value + 'rem';
          page.style.paddingBottom = target.value + 'rem';
          break;
        case 'primary-color':
          changeTextColor('primary', target.value);
          break;
        case 'secondary-color':
          changeTextColor('secondary', target.value);
          break;
      }
    });
  }
  
  function setupHeaderControls() {
    const headerControls = document.getElementById('header-controls');
    headerControls.addEventListener('input', function(event) {
      const target = event.target;
      switch(target.id) {
        case 'header-layout':
          changeHeaderLayout(target.value);
          break;
        case 'title-size':
        header.querySelector('.title').style.fontSize = target.value + 'rem';
        break;
        case 'subtitle-size':
          header.querySelector('.subtitle').style.fontSize = target.value + 'rem';
          break;
      }
    });
  }

  function changeTextColor(target, value) {
    const selector = '.' + target;
    const elements = document.querySelectorAll(selector);
    elements.forEach(e => e.style.color = value);
  }

  function changeHeaderLayout(value) {
    if (value === 'horizontal') {
      header.classList.remove('header-vertical');
      header.classList.add('header-horizontal');
    } else {
      header.classList.remove('header-horizontal');
      header.classList.add('header-vertical');
    }
  }

  setupGeneralControls();
  setupHeaderControls();
});