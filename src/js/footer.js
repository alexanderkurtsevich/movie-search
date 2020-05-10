import '../style/footer.css';

export default function createFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const courseTitle = document.createElement('p');
  courseTitle.classList.add('footer__course-title');
  courseTitle.innerHTML = 'RS School 2020q1';
  footer.append(courseTitle);

  const githubLink = document.createElement('a');
  githubLink.classList.add('footer__github-link');
  githubLink.innerHTML = '@alexanderkurtsevich';
  githubLink.setAttribute('href', 'https://github.com/alexanderkurtsevich');
  footer.append(githubLink);

  document.body.append(footer);
}
