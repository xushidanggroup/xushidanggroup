---
title: People
date: 2024-07-03
type: landing
sections:
  - block: markdown
    content:
      title: The Team
      text: |
        <div class="group-photo">
          <img src="/images/红林花海_2024.9.18.jpg?fm=webp" alt="Group Photo 2">
        </div>
  - block: people
    content:
      title: null
      user_groups:
        - Principle Investigator
        - Graduate Students
      sort_by: Params.last_name
      sort_ascending: true
    design:
      show_interests: false
      show_role: true
      show_organizations: true
      show_social: true
  - block: markdown
    content:
      text: |
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
  - block: markdown
    content:
      text: |
        <div class="group-photo">
          <img src="/images/9_课题组合照_2024.jpg?fm=webp" alt="Group Photo 1">
        </div>
---