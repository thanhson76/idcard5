<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>国际学生证生成器 (正反面)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

    body {
      font-family: 'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
    }

    /* 美化文件上传按钮 */
    input[type="file"]::file-selector-button {
      font-weight: 600;
      color: #dc2626;
      /* Red-600 */
      padding: 0.5em 1em;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.375rem;
      background-color: #fef2f2;
      /* Red-50 */
      cursor: pointer;
      transition: background-color 0.2s;
    }

    input[type="file"]::file-selector-button:hover {
      background-color: #fee2e2;
      /* Red-100 */
    }

    /* 语言切换按钮样式 */
    .lang-btn.active {
      background-color: #dc2626;
      color: white;
      font-weight: bold;
    }

    /* 颜色选择器样式 */
    input[type="color"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
      height: 40px;
      padding: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
    }

    input[type="color"]::-moz-color-swatch {
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
    }

    /* 签名样式 */
    .signature-text {
      font-family: 'Dancing Script', cursive;
      font-size: 1.5rem;
      /* 24px */
      line-height: 2rem;
      /* 32px */
      color: #1f2937;
      /* gray-800 */
    }
  </style>
</head>

<body class="bg-gray-100 flex items-center justify-center min-h-screen p-4 md:p-8">

  <div class="container w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10">

    <div class="text-center mb-4">
      <h1 class="text-3xl md:text-4xl font-bold text-red-600" data-lang="mainTitle">国际学生证生成器</h1>
      <p class="text-gray-500 mt-2" data-lang="subTitle">为国际学生创建专属身份证明 (包含正反面)。</p>
    </div>

    <div class="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-8">
      <div class="flex justify-center space-x-2">
        <button class="lang-btn px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
          data-lang-code="zh-CN">中文</button>
        <button class="lang-btn px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
          data-lang-code="en-US">English</button>
        <button class="lang-btn px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
          data-lang-code="ru-RU">Русский</button>
      </div>
      <button id="randomFillBtn"
        class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        data-lang="randomFillBtn">一键填充所有信息</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

      <div class="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-3" data-lang="frontInfoTitle">📝 正面信息</h2>
        <div class="space-y-5 mb-8">
          <div>
            <label for="universityName" class="block text-sm font-medium text-gray-700 mb-1"
              data-lang="universityNameLabel">大学名称 (英文)</label>
            <input type="text" id="universityName" data-lang-placeholder="universityNamePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
          </div>
          <div>
            <label for="studentName" class="block text-sm font-medium text-gray-700 mb-1"
              data-lang="studentNameLabel">学生姓名 (英文全名)</label>
            <input type="text" id="studentName" data-lang-placeholder="studentNamePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
          </div>
          <div>
            <label for="studentId" class="block text-sm font-medium text-gray-700 mb-1"
              data-lang="studentIdLabel">学号</label>
            <input type="text" id="studentId" data-lang-placeholder="studentIdPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
          </div>
          <div>
            <label for="faculty" class="block text-sm font-medium text-gray-700 mb-1" data-lang="facultyLabel">院系/专业
              (英文)</label>
            <input type="text" id="faculty" data-lang-placeholder="facultyPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="issueDate" class="block text-sm font-medium text-gray-700 mb-1"
                data-lang="issueDateLabel">签发日期</label>
              <input type="date" id="issueDate"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
            </div>
            <div>
              <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1"
                data-lang="expiryDateLabel">有效期至</label>
              <input type="date" id="expiryDate"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" data-lang="studentPhotoLabel">上传或生成个人照片</label>
            <div class="flex items-center space-x-2">
              <input type="file" id="studentPhoto" accept="image/*"
                class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100">
              <button type="button" id="generatePhotoBtn"
                class="px-3 py-2 bg-gray-600 text-white rounded-lg text-sm whitespace-nowrap hover:bg-gray-700 transition"
                data-lang="generatePhotoBtn">随机生成</button>
            </div>
          </div>
          <div>
            <label for="schoolLogo" class="block text-sm font-medium text-gray-700 mb-1"
              data-lang="schoolLogoLabel">上传学校Logo (可选)</label>
            <input type="file" id="schoolLogo" accept="image/*"
              class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100">
          </div>
          <div>
            <label for="headerColor" class="block text-sm font-medium text-gray-700 mb-1"
              data-lang="headerColorLabel">自定义头部背景色</label>
            <input type="color" id="headerColor" value="#dc2626">
          </div>
        </div>

        <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-3" data-lang="backInfoTitle">🔙 背面信息</h2>
        <div class="space-y-5">
          <div>
            <label for="cardHolderAddress" class="block text-sm font-medium text-gray-700 mb-1"
              data-lang="addressLabel">持卡人地址 (英文)</label>
            <input type="text" id="cardHolderAddress" data-lang-placeholder="addressPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
          </div>
          <div>
            <label for="officialNotes" class="block text-sm font-medium text-gray-700 mb-1"
              data-lang="notesLabel">官方声明/备注 (英文)</label>
            <textarea id="officialNotes" rows="3" data-lang-placeholder="notesPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"></textarea>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <h2 class="text-xl font-semibold text-gray-800 mb-6" data-lang="previewTitle">🖼️ 效果预览</h2>

        <div id="idCardFront"
          class="w-[380px] min-h-[240px] bg-white rounded-xl shadow-lg flex flex-col transition-all duration-300 overflow-hidden border">

          <div id="cardHeader" class="text-white p-3 flex items-center space-x-3">
            <div id="cardHeaderLogoContainer"
              class="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden hidden">
              <img id="cardHeaderLogo" src="" alt="学校Logo" class="max-w-full max-h-full object-contain rounded-full">
            </div>
            <div id="headerContentWrapper" class="flex flex-col">
              <h3 id="cardUniversityNameHeader" class="font-bold text-base leading-tight m-0">UNIVERSITY NAME</h3>
              <p class="text-xs opacity-90 leading-tight m-0" data-lang="cardType">INTERNATIONAL STUDENT ID CARD</p>
            </div>
          </div>

          <div class="flex flex-grow p-4">
            <div class="flex-shrink-0 mr-4">
              <img id="cardPhoto" src="./static/image/default/photo.svg" alt="学生照片"
                class="w-[128px] h-[128px] object-cover border-2 border-white rounded-md shadow-md bg-gray-200">
            </div>
            <div class="text-xs text-gray-800 w-full flex flex-col justify-between">
              <div>
                <p class="font-semibold text-gray-500" data-lang="cardName">NAME</p>
                <p class="font-bold text-sm" id="cardStudentName">STUDENT NAME</p>
              </div>
              <div>
                <p class="font-semibold text-gray-500" data-lang="cardStudentId">STUDENT ID</p>
                <p class="font-bold text-sm" id="cardStudentId">STUDENT ID</p>
              </div>
              <div>
                <p class="font-semibold text-gray-500" data-lang="cardFaculty">FACULTY</p>
                <p class="font-bold text-sm" id="cardFaculty">FACULTY NAME</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-2 flex justify-between items-center border-t mt-auto">
            <div class="text-xs">
              <p class="text-gray-500" data-lang="cardIssue">ISSUE</p>
              <p class="font-semibold" id="cardIssueDate">YYYY-MM-DD</p>
            </div>
            <div class="text-xs text-right">
              <p class="text-gray-500" data-lang="cardValid">VALID</p>
              <p class="font-semibold" id="cardExpiryDate">YYYY-MM-DD</p>
            </div>
          </div>
        </div>
        <button id="downloadFrontBtn"
          class="mt-4 w-full max-w-xs bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          data-lang="downloadFront" disabled>下载正面 (PNG)</button>

        <hr class="my-8 w-full max-w-xs">

        <div id="idCardBack"
          class="w-[380px] h-[240px] bg-white rounded-xl shadow-lg flex flex-col transition-all duration-300 overflow-hidden border">
          <div class="w-full h-10 bg-black mt-4"></div>
          <div class="p-4 text-xs text-gray-700 flex-grow">
            <p class="font-semibold text-gray-500" data-lang="cardAddress">HOLDER'S ADDRESS:</p>
            <p id="cardBackAddress" class="mb-3">HOLDER'S ADDRESS</p>
            <p id="cardBackNotes" class="text-[10px] leading-tight"></p>
          </div>
          <div class="px-4 pb-4 flex justify-between items-end">
            <div class="text-left">
              <div id="cardSignatureText" class="signature-text">Your Name</div>
              <p class="text-[10px] text-gray-500 pt-1" data-lang="cardSignature">Holder's
                Signature</p>
            </div>
            <img id="cardBackLogo" src="" alt="学校Logo" class="w-[70px] h-[70px] object-contain hidden">
          </div>
        </div>
        <button id="downloadBackBtn"
          class="mt-4 w-full max-w-xs bg-gray-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          data-lang="downloadBack" disabled>下载背面 (PNG)</button>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // --- 语言数据 ---
      const translations = {
        'zh-CN': {
          mainTitle: '国际学生证生成器',
          subTitle: '为国际学生创建专属身份证明 (包含正反面)。',
          randomFillBtn: '一键填充所有信息',
          frontInfoTitle: '📝 正面信息',
          universityNameLabel: '大学名称 (英文)',
          universityNamePlaceholder: '例如：Peking University',
          studentNameLabel: '学生姓名 (英文全名)',
          studentNamePlaceholder: '例如：Zhang Wei',
          studentIdLabel: '学号',
          studentIdPlaceholder: '例如：INT2025001',
          facultyLabel: '院系/专业 (英文)',
          facultyPlaceholder: '例如：School of Computer Science',
          issueDateLabel: '签发日期',
          expiryDateLabel: '有效期至',
          studentPhotoLabel: '上传或生成个人照片',
          generatePhotoBtn: '随机生成',
          schoolLogoLabel: '上传学校Logo (可选)',
          headerColorLabel: '自定义头部背景色',
          backInfoTitle: '🔙 背面信息',
          addressLabel: '持卡人地址 (英文)',
          addressPlaceholder: '例如：No. 5 Yiheyuan Road, Haidian District, Beijing',
          notesLabel: '官方声明/备注 (英文)',
          notesPlaceholder: '此卡为大学财产，须按要求退还。如果拾获，请交还给最近的大学办公室。',
          previewTitle: '🖼️ 效果预览',
          cardType: '国际学生证',
          cardName: '姓名',
          cardStudentId: '学号',
          cardFaculty: '院系/专业',
          cardIssue: '签发日期',
          cardValid: '有效期至',
          downloadFront: '下载正面 (PNG)',
          downloadBack: '下载背面 (PNG)',
          cardAddress: '持卡人地址',
          cardSignature: '持卡人签名',
        },
        'en-US': {
          mainTitle: 'International Student ID Generator',
          subTitle: 'Create a custom identity card for international students (front and back).',
          randomFillBtn: 'Randomly Fill All Info',
          frontInfoTitle: '📝 Front Side Information',
          universityNameLabel: 'University Name (English)',
          universityNamePlaceholder: 'e.g., International University',
          studentNameLabel: 'Student Name (Full English Name)',
          studentNamePlaceholder: 'e.g., John Appleseed',
          studentIdLabel: 'Student ID',
          studentIdPlaceholder: 'e.g., INT2025001',
          facultyLabel: 'Faculty/Major (English)',
          facultyPlaceholder: 'e.g., Faculty of Computer Science',
          issueDateLabel: 'Issue Date',
          expiryDateLabel: 'Valid Until',
          studentPhotoLabel: 'Upload or Generate Photo',
          generatePhotoBtn: 'Generate',
          schoolLogoLabel: 'Upload School Logo (Optional)',
          headerColorLabel: 'Custom Header Color',
          backInfoTitle: '🔙 Back Side Information',
          addressLabel: 'Card Holder Address (English)',
          addressPlaceholder: 'e.g., 123 Main Street, Anytown',
          notesLabel: 'Official Notes/Statement (English)',
          notesPlaceholder: 'This card is the property of the university and must be returned upon request. If found, please return to the nearest university office.',
          previewTitle: '🖼️ Preview',
          cardType: 'INTERNATIONAL STUDENT ID CARD',
          cardName: 'NAME',
          cardStudentId: 'STUDENT ID',
          cardFaculty: 'FACULTY',
          cardIssue: 'ISSUE',
          cardValid: 'VALID',
          downloadFront: 'Download Front (PNG)',
          downloadBack: 'Download Back (PNG)',
          cardAddress: "HOLDER'S ADDRESS",
          cardSignature: "Holder's Signature",
        },
        'ru-RU': {
          mainTitle: 'Генератор международных студенческих билетов',
          subTitle: 'Создайте удостоверение личности для иностранных студентов (лицевая и оборотная стороны).',
          randomFillBtn: 'Заполнить всё случайным образом',
          frontInfoTitle: '📝 Информация на лицевой стороне',
          universityNameLabel: 'Название университета (на английском)',
          universityNamePlaceholder: 'Например: Moscow State University',
          studentNameLabel: 'Имя студента (полное, на английском)',
          studentNamePlaceholder: 'Например: Ivan Petrov',
          studentIdLabel: 'Номер студенческого билета',
          studentIdPlaceholder: 'Например: INT2025001',
          facultyLabel: 'Факультет/Специальность (на английском)',
          facultyPlaceholder: 'Например: Faculty of Chemistry',
          issueDateLabel: 'Дата выдачи',
          expiryDateLabel: 'Действителен до',
          studentPhotoLabel: 'Загрузить или сгенерировать фото',
          generatePhotoBtn: 'Сгенерировать',
          schoolLogoLabel: 'Загрузить логотип школы (необязательно)',
          headerColorLabel: 'Цвет фона заголовка',
          backInfoTitle: '🔙 Информация на оборотной стороне',
          addressLabel: 'Адрес владельца карты (на английском)',
          addressPlaceholder: 'Например: 1 Leninskie Gory, Moscow',
          notesLabel: 'Официальные примечания (на английском)',
          notesPlaceholder: 'Эта карта является собственностью университета и должна быть возвращена по требованию. В случае находки, пожалуйста, верните в ближайший офис университета.',
          previewTitle: '🖼️ Предпросмотр',
          cardType: 'МЕЖДУНАРОДНЫЙ СТУДЕНЧЕСКИЙ БИЛЕТ',
          cardName: 'ИМЯ',
          cardStudentId: 'НОМЕР СТУДЕНТА',
          cardFaculty: 'ФАКУЛЬТЕТ',
          cardIssue: 'ДАТА ВЫДАЧИ',
          cardValid: 'ДЕЙСТВИТЕЛЕН ДО',
          downloadFront: 'Скачать лицевую сторону (PNG)',
          downloadBack: 'Скачать оборотную сторону (PNG)',
          cardAddress: 'АДРЕС ВЛАДЕЛЬЦА',
          cardSignature: 'Подпись владельца',
        }
      }

      const mockData = {
        'zh-CN': {
          names: ['Zhang Wei', 'Wang Fang', 'Li Na', 'Zhao Min', 'Liu Jing', 'Chen Lei', 'Yang Yang'],
          universities: ['Peking University', 'Tsinghua University', 'Fudan University', 'Shanghai Jiao Tong University', 'Zhejiang University', 'Wuhan University'],
          faculties: ['Computer Science', 'Foreign Languages', 'Economics and Management', 'Medicine', 'Physics', 'Automation'],
          addresses: [
            'No. 5 Yiheyuan Road, Haidian District, Beijing',
            'No. 3663 Zhongshan North Road, Putuo District, Shanghai',
            'No. 220 Handan Road, Yangpu District, Shanghai',
            'No. 866 Yuhangtang Road, Xihu District, Hangzhou'
          ]
        },
        'ru-RU': {
          names: ['Ivan Petrov', 'Elena Smirnova', 'Dmitry Volkov', 'Svetlana Kuznetsova', 'Andrey Popov', 'Olga Morozova'],
          universities: ['Lomonosov Moscow State University', 'Saint Petersburg State University', 'Novosibirsk State University', 'Bauman Moscow State Technical University'],
          faculties: ['Chemistry', 'History', 'Mathematics and Mechanics', 'Philology', 'Journalism', 'Biology'],
          addresses: [
            '1 Leninskie Gory, Moscow',
            '7-9 Universitetskaya Embankment, Saint Petersburg',
            '1 Tverskaya Street, Moscow',
            '4 Nevsky Prospekt, Saint Petersburg'
          ]
        },
        'en-US': {
          names: ['John Smith', 'Emily Johnson', 'Michael Williams', 'Jessica Brown', 'David Jones', 'Sarah Miller'],
          universities: ['International University of Science', 'Global Tech Institute', 'Metropolitan University', 'World Arts College', 'United Scholars University'],
          faculties: ['Computer Science', 'International Relations', 'Medicine', 'Economics', 'Linguistics', 'Engineering'],
          addresses: [
            '123 Main Street, Anytown, USA',
            '456 Oak Avenue, Springfield, USA',
            '789 Pine Lane, Metropolis, USA',
            '101 Maple Drive, Gotham, USA'
          ]
        }
      }

      function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
      }

      // --- DOM Element References ---
      const inputs = {
        universityName: document.getElementById('universityName'),
        studentName: document.getElementById('studentName'),
        studentId: document.getElementById('studentId'),
        faculty: document.getElementById('faculty'),
        issueDate: document.getElementById('issueDate'),
        expiryDate: document.getElementById('expiryDate'),
        studentPhoto: document.getElementById('studentPhoto'),
        schoolLogo: document.getElementById('schoolLogo'),
        headerColor: document.getElementById('headerColor'),
        cardHolderAddress: document.getElementById('cardHolderAddress'),
        officialNotes: document.getElementById('officialNotes'),
      }

      const cardFrontElements = {
        header: document.getElementById('cardHeader'),
        universityNameHeader: document.getElementById('cardUniversityNameHeader'),
        studentName: document.getElementById('cardStudentName'),
        studentId: document.getElementById('cardStudentId'),
        faculty: document.getElementById('cardFaculty'),
        issueDate: document.getElementById('cardIssueDate'),
        expiryDate: document.getElementById('cardExpiryDate'),
        photo: document.getElementById('cardPhoto'),
        headerLogoContainer: document.getElementById('cardHeaderLogoContainer'), // <-- 新增这一行
        headerLogo: document.getElementById('cardHeaderLogo'),
      }

      const cardBackElements = {
        address: document.getElementById('cardBackAddress'),
        notes: document.getElementById('cardBackNotes'),
        logo: document.getElementById('cardBackLogo'),
        signature: document.getElementById('cardSignatureText'),
      }

      const downloadFrontBtn = document.getElementById('downloadFrontBtn')
      const downloadBackBtn = document.getElementById('downloadBackBtn')
      const generatePhotoBtn = document.getElementById('generatePhotoBtn')
      const randomFillBtn = document.getElementById('randomFillBtn')
      const idCardFront = document.getElementById('idCardFront')
      const idCardBack = document.getElementById('idCardBack')
      const langButtons = document.querySelectorAll('.lang-btn')

      let photoUploaded = false

      // --- Functions ---
      const setLanguage = (lang) => {
        const langData = translations[lang]
        document.querySelectorAll('[data-lang]').forEach(el => {
          const key = el.dataset.lang
          if (langData[key]) {
            el.textContent = langData[key]
          }
        })
        document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
          const key = el.dataset.langPlaceholder
          if (langData[key]) {
            el.placeholder = langData[key]
          }
        })
        langButtons.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.langCode === lang)
        })

        updateCard()
      }

      function updateCard() {
        cardFrontElements.header.style.backgroundColor = inputs.headerColor.value
        cardFrontElements.universityNameHeader.textContent = inputs.universityName.value || 'UNIVERSITY NAME'
        cardFrontElements.studentName.textContent = inputs.studentName.value || 'STUDENT NAME'
        cardFrontElements.studentId.textContent = inputs.studentId.value || 'STUDENT ID'
        cardFrontElements.faculty.textContent = inputs.faculty.value || 'FACULTY NAME'
        cardFrontElements.issueDate.textContent = inputs.issueDate.value || 'YYYY-MM-DD'
        cardFrontElements.expiryDate.textContent = inputs.expiryDate.value || 'YYYY-MM-DD'
        cardBackElements.address.textContent = inputs.cardHolderAddress.value || "HOLDER'S ADDRESS"
        cardBackElements.signature.textContent = inputs.studentName.value || "Your Name"

        const notesValue = inputs.officialNotes.value.trim()
        const currentLang = document.querySelector('.lang-btn.active')?.dataset.langCode || 'en-US'
        if (notesValue) {
          cardBackElements.notes.textContent = notesValue
        } else {
          // If input is empty, use placeholder from translations for the card preview
          cardBackElements.notes.textContent = translations[currentLang].notesPlaceholder
        }

        checkDownloadButtonsState()
      }

      function checkDownloadButtonsState() {
        const frontCanDownload = photoUploaded && inputs.studentName.value.trim() !== '' && inputs.studentId.value.trim() !== '' && inputs.universityName.value.trim() !== ''
        downloadFrontBtn.disabled = !frontCanDownload
        const backCanDownload = inputs.cardHolderAddress.value.trim() !== ''
        downloadBackBtn.disabled = !backCanDownload
      }

      function downloadCard(element, side) {
        // 在截图前，获取内容包装器
        const wrapper = document.getElementById('headerContentWrapper')
        if (wrapper && side === 'Front') {
          wrapper.style.transform = 'translateY(-5px)'
        }

        html2canvas(element, { scale: 3, useCORS: true, backgroundColor: '#ffffff' })
          .then(canvas => {
            const link = document.createElement('a')
            link.href = canvas.toDataURL('image/png')
            const studentName = inputs.studentName.value || 'student'
            link.download = `International-ID-${studentName}-${side}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }).catch(err => {
            console.error(`生成${side}图片失败!`, err)
            alert(`抱歉，${side}图片生成失败。如果您正在使用本地图片，请确保您已通过本地服务器 (http://localhost:8000) 访问此页面，并检查图片路径是否正确。`)
          }).finally(() => {
            if (wrapper && side === 'Front') {
              wrapper.style.transform = ''
            }
          })
      }

      // --- Event Listeners ---
      Object.values(inputs).forEach(input => {
        if (input.type !== 'file') {
          input.addEventListener('input', updateCard)
        }
      })

      inputs.studentPhoto.addEventListener('change', (event) => {
        const file = event.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            cardFrontElements.photo.src = e.target.result
            photoUploaded = true
            checkDownloadButtonsState()
          }
          reader.readAsDataURL(file)
        }
      })

      function generateRandomPhoto() {
        const gender = Math.random() > 0.5 ? 'men' : 'women'
        const photoNumber = Math.floor(Math.random() * 101)
        const photoPath = `static/image/${gender}/${photoNumber}.jpg`

        cardFrontElements.photo.src = photoPath
        photoUploaded = true
        checkDownloadButtonsState()
      }

      generatePhotoBtn.addEventListener('click', generateRandomPhoto)

      randomFillBtn.addEventListener('click', () => {
        randomFillBtn.disabled = true
        const currentLang = document.querySelector('.lang-btn.active')?.dataset.langCode || 'en-US'
        const originalText = translations[currentLang].randomFillBtn
        randomFillBtn.textContent = '...'

        try {
          generateRandomPhoto()

          const data = mockData[currentLang]
          inputs.studentName.value = getRandomItem(data.names)
          inputs.universityName.value = getRandomItem(data.universities)
          inputs.faculty.value = `Faculty of ${getRandomItem(data.faculties)}`
          inputs.cardHolderAddress.value = getRandomItem(data.addresses)
          inputs.studentId.value = `INT${Math.floor(100000 + Math.random() * 900000)}`

          const issueDate = new Date()
          issueDate.setDate(issueDate.getDate() - Math.floor(Math.random() * 365 * 2))
          inputs.issueDate.value = issueDate.toISOString().split('T')[0]

          const expiryDate = new Date(issueDate)
          expiryDate.setFullYear(expiryDate.getFullYear() + 4)
          inputs.expiryDate.value = expiryDate.toISOString().split('T')[0]
          inputs.officialNotes.value = translations[currentLang].notesPlaceholder

          updateCard()

        } catch (error) {
          console.error("一键填充失败:", error)
          alert('抱歉，填充随机信息时发生未知错误。')
        } finally {
          setTimeout(() => {
            randomFillBtn.disabled = false
            randomFillBtn.textContent = originalText
          }, 300)
        }
      })


      inputs.schoolLogo.addEventListener('change', (event) => {
        const file = event.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const logoUrl = e.target.result
            cardFrontElements.headerLogo.src = logoUrl
            cardBackElements.logo.src = logoUrl
            cardFrontElements.headerLogoContainer.classList.remove('hidden')
            cardBackElements.logo.classList.remove('hidden')
          }
          reader.readAsDataURL(file)
        }
      })

      langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          setLanguage(btn.dataset.langCode)
        })
      })

      downloadFrontBtn.addEventListener('click', () => downloadCard(idCardFront, 'Front'))
      downloadBackBtn.addEventListener('click', () => downloadCard(idCardBack, 'Back'))

      // --- Initialisation ---
      setLanguage('zh-CN')
    });
  </script>
</body>

</html>