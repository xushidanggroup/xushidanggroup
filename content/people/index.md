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
          <div class="person">
            <a href="/people/Xu/"><img src="Xu/avatar.jpg" alt="Shidang Xu 许适当"></a>
            <p class="name"><a href="/people/Xu/">Shidang Xu 许适当</a></p>
            <p class="details">Professor in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('xusd@scut.edu.cn')">
              <i class="fas fa-envelope"></i><span>xusd@scut.edu.cn</span>
            </div>
            <div class="scholar" onclick="window.open('https://scholar.google.com/citations?user=HiGQESUAAAAJ&hl=zh-CN&oi=ao')">
              <i class="fas fa-graduation-cap"></i><span>Google Scholar</span>
            </div>
          </div>
        </div>

        ---

        ## Graduate Students

        <div class="container">
          <div class="person">
            <a href="/people/Bin/"><img src="Bin/avatar.jpg" alt="Bin Xu"></a>
            <p class="name"><a href="/people/Bin/">Bin Xu 许膑</a></p>
            <p class="details">23 PhD Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('bun_hui@126.com')">
              <i class="fas fa-envelope"></i><span>bun_hui@126.com</span>
            </div>
            <div class="scholar" onclick="window.open('https://scholar.google.com/citations?hl=zh-CN&user=dLJxV9MAAAAJ')">
              <i class="fas fa-graduation-cap"></i><span>Google Scholar</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/NB/"><img src="NB/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/NB/">Bo Niu 牛博</a></p>
            <p class="details">24 Master’s Student in Pharmacy</p>
            <div class="email" onclick="copyToClipboard('niubo7645@gmail.com')">
              <i class="fas fa-envelope"></i><span>niubo7645@gmail.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/CC/"><img src="CC/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/CC/">Chenchen Li 李晨晨</a></p>
            <p class="details">23 PhD Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('lcc1430880822@163.com')">
              <i class="fas fa-envelope"></i><span>lcc1430880822@163.com</span>
            </div>
            <div class="scholar" onclick="window.open('https://scholar.google.com/citations?hl=zh-CN&user=4zGLorYAAAAJ')">
              <i class="fas fa-graduation-cap"></i><span>Google Scholar</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/GF/"><img src="GF/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/GF/">Guifang Zhen 甄桂芳</a></p>
            <p class="details">25 Master’s Student in Pharmacy</p>
            <div class="email" onclick="copyToClipboard('19866809606@163.com')">
              <i class="fas fa-envelope"></i><span>19866809606@163.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/JD/"><img src="JD/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/JD/">Jinda Yan 闫缙达</a></p>
            <p class="details">24 PhD Student in Materials and Chemical Engineering</p>
            <div class="email" onclick="copyToClipboard('jdyan09@163.com')">
              <i class="fas fa-envelope"></i><span>jdyan09@163.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/JC/"><img src="JC/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/JC/">Jingcheng Mo 莫景丞</a></p>
            <p class="details">24 Master’s Student in Pharmacy</p>
            <div class="email" onclick="copyToClipboard('jingchengmo@foxmail.com')">
              <i class="fas fa-envelope"></i><span>jingchengmo@foxmail.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/OY/"><img src="OY/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/OY/">Junchi Ouyang 欧阳骏驰</a></p>
            <p class="details">24 Master’s Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('oyjc_scut@126.com')">
              <i class="fas fa-envelope"></i><span>oyjc_scut@126.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/LP/"><img src="LP/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/LP/">Lipeng Luo 罗丽鹏</a></p>
            <p class="details">24 Master’s Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('llp_scut@126.com')">
              <i class="fas fa-envelope"></i><span>llp_scut@126.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/MT/"><img src="MT/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/MT/">Meitang Peng 彭美堂</a></p>
            <p class="details">23 Master’s Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('meitangpeng@gmail.com')">
              <i class="fas fa-envelope"></i><span>meitangpeng@gmail.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/GMT/"><img src="GMT/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/GMT/">Mengting Guan 管梦婷</a></p>
            <p class="details">24 Master’s Student in Pharmacy</p>
            <div class="email" onclick="copyToClipboard('gmt1923@163.com')">
              <i class="fas fa-envelope"></i><span>gmt1923@163.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/SC/"><img src="SC/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/SC/">Shicheng Lang 稂世成</a></p>
            <p class="details">24 PhD Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('920815351@qq.com')">
              <i class="fas fa-envelope"></i><span>920815351@qq.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/YF/"><img src="YF/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/YF/">Yifei Han 韩逸飞</a></p>
            <p class="details">25 Master's Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('2784331517@qq.com')">
              <i class="fas fa-envelope"></i><span>2784331517@qq.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/YH/"><img src="YH/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/YH/">Yinghao Liu 刘英豪</a></p>
            <p class="details">23 Master’s Student in Chemistry</p>
            <div class="email" onclick="copyToClipboard('Yinghao612@gmail.com')">
              <i class="fas fa-envelope"></i><span>Yinghao612@gmail.com</span>
            </div>
          </div>
          <div class="person">
            <a href="/people/YJ/"><img src="YJ/avatar.jpg" alt="Graduate Student"></a>
            <p class="name"><a href="/people/YJ/">Yujian Liu 刘宇健</a></p>
            <p class="details">23 Master’s Student in Biomedical Engineering</p>
            <div class="email" onclick="copyToClipboard('liuyujian0408@gmail.com')">
              <i class="fas fa-envelope"></i><span>liuyujian0408@gmail.com</span>
            </div>
          </div>
        </div>

        ---

        ## Undergraduate Students

        <table style="width:100%; border-collapse: collapse; border: none;">
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Ruoqi Chen</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2021)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;"></td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Xinjie Shen</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Artificial Intelligence at SCUT (2021)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;"></td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Qingquan Wang</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2022)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;"></td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Yutong Wang</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2022)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;"></td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Yuechuan Lin</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2023)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;"></td>
          </tr>
        </table>

        ---

        ## Alumni

        <table style="width:100%; border-collapse: collapse; border: none;">
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Lu Qiu</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2019-2023)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">Master of Biostatistics, Columbia University (2023)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Yunlong Zhu</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2019-2023)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">Master of science and engineering, Johns Hopkins University (2023)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Ying Chen</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2019-2023)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">Master of Biomedical engineering, University of Electronic Science and Technology of China (2023)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Ranxuan Zhang</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2019-2023)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">Master of Biomedical engineering, Chalmers University of Technology (2023)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Yuan Chen</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2020-2024)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">PhD in Chemistry, Nanyang Technological University (2024)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Fangxi Lian</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2020-2024)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">Working at Lubangdi International Logistics Service Co.Ltd (2024)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Zihuang Lu</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2020-2024)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">Master of Bioinformatics, University of Science and Technology of China (2024)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Ruoxuan Wu</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2020-2024)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">PhD in Biomedical engineering, University of Texas, Southwestern Medical Center at Dallas (2024)</td>
          </tr>
          <tr>
            <td style="width: 20%; padding: 8px; vertical-align: middle;">Mingyu Lin</td>
            <td style="width: 35%; padding: 8px; vertical-align: middle;">Biomedical Engineering at SCUT (2020-2024)</td>
            <td style="width: 45%; padding: 8px; vertical-align: middle;">Master in Biomedical Engineering, National University of Singapore (2024)</td>
          </tr>
        </table>

        ---
        <div class="group-photo">
          <img src="/images/9_课题组合照_2024.jpg?fm=webp" alt="Group Photo 1">
        </div> 
---