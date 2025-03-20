---
title: People
date: 2024-07-03
type: landing
sections:
  - block: markdown
    content:
      title: The Team
      text: |
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <style>
          .container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: flex-start;
          }
          .person {
            flex: 1 1 calc(20% - 20px);
            max-width: calc(20% - 20px);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 20px;
          }
          .person img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            margin-bottom: 10px;
          }
          .person p {
            margin: 0;
          }
          .person .name {
            font-size: 14px;
          }
          .person .details {
            font-size: 12px;
          }
          .person .email, .person .scholar {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5px;
            cursor: pointer;
          }
          .person .email .fa-envelope, .person .scholar .fa-graduation-cap {
            margin-right: 5px;
          }
          .person .email span, .person .scholar span {
            display: none;
            font-size: 12px;
          }
          .person .email:hover span, .person .scholar:hover span {
            display: inline;
          }
          .person a {
            text-decoration: none;
            color: inherit;
          }
          .person a:hover {
            text-decoration: underline;
          }
          @media (max-width: 1200px) {
            .person {
              flex: 1 1 calc(25% - 20px);
              max-width: calc(25% - 20px);
            }
          }
          @media (max-width: 992px) {
            .person {
              flex: 1 1 calc(33.33% - 20px);
              max-width: calc(33.33% - 20px);
            }
          }
          @media (max-width: 768px) {
            .person {
              flex: 1 1 calc(50% - 20px);
              max-width: calc(50% - 20px);
            }
          }
          @media (max-width: 576px) {
            .person {
              flex: 1 1 100%;
              max-width: 100%;
            }
          }
        </style>
        <script>
          function copyToClipboard(email) {
            navigator.clipboard.writeText(email).then(function() {
              alert('Email copied to clipboard: ' + email);
            }, function(err) {
              console.error('Could not copy text: ', err);
            });
          }
        </script>

        <div class="group-photo">
          <img src="/images/红林花海_2024.9.18.jpg?fm=webp" alt="Group Photo 2">
        </div>

        ---

        ## Principle Investigator

        <div class="container">
          {{ range .Site.Data.people.principle_investigator }}
          <div class="person">
            <a href="/people/{{ .folder }}/"><img src="/people/{{ .folder }}/avatar.jpg" alt="{{ .name }}"></a>
            <p class="name"><a href="/people/{{ .folder }}/">{{ .name }}</a></p>
            <p class="details">{{ .role }}</p>
            {{ if .email }}
            <div class="email" onclick="copyToClipboard('{{ .email }}')">
              <i class="fas fa-envelope"></i><span>{{ .email }}</span>
            </div>
            {{ end }}
            {{ if .scholar }}
            <div class="scholar" onclick="window.open('{{ .scholar }}')">
              <i class="fas fa-graduation-cap"></i><span>Google Scholar</span>
            </div>
            {{ end }}
          </div>
          {{ end }}
        </div>

        ---

        ## Graduate Students

        <div class="container">
          {{ range .Site.Data.people.graduate_students }}
          <div class="person">
            <a href="/people/{{ .folder }}/"><img src="/people/{{ .folder }}/avatar.jpg" alt="{{ .name }}"></a>
            <p class="name"><a href="/people/{{ .folder }}/">{{ .name }}</a></p>
            <p class="details">{{ .role }}</p>
            {{ if .email }}
            <div class="email" onclick="copyToClipboard('{{ .email }}')">
              <i class="fas fa-envelope"></i><span>{{ .email }}</span>
            </div>
            {{ end }}
            {{ if .scholar }}
            <div class="scholar" onclick="window.open('{{ .scholar }}')">
              <i class="fas fa-graduation-cap"></i><span>Google Scholar</span>
            </div>
            {{ end }}
          </div>
          {{ end }}
        </div>

        ---

        ## Undergraduate Students

        <table style="width:100%; border-collapse: collapse; border: none;">
          {{ range .Site.Data.people.undergraduate_students }}
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">{{ .name }}</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">{{ .role }}</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;"></td>
          </tr>
          {{ end }}
        </table>

        ---

        ## Alumni

        <table style="width:100%; border-collapse: collapse; border: none;">
          {{ range .Site.Data.people.alumni }}
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">{{ .name }}</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">{{ .role }}</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">{{ .current }}</td>
          </tr>
          {{ end }}
        </table>

        ---
        <div class="group-photo">
          <img src="/images/9_课题组合照_2024.jpg?fm=webp" alt="Group Photo 1">
        </div>
---