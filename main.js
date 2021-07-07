Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isEmailAndPhone('#email'),
      Validator.isRequired('#password', 'Vui lòng nhập mật khẩu'),
      Validator.minLength('#password', 6),
    ],
    onSubmit(data) {
      console.log(data)
    }
  })
  Validator({
    form: '#form-2',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isRequired('#firstname', 'Vui lòng nhập Họ'),
      Validator.isRequired('#lastname', 'Vui lòng nhập Tên'),
      Validator.isEmailAndPhone('#phoneandemail'),
      Validator.isRequired('#newpassword', 'Vui lòng nhập mật khẩu'),
      Validator.minLength('#newpassword', 6),
      Validator.isRequired('#password_confirmation', 'Vui lòng nhập trường này'),
      Validator.isRequired('#day', 'Chưa chọn ngày'),
      Validator.isRequired('#month', 'Chưa chọn tháng'),
      Validator.isRequired('#year', 'Chưa chọn năm'),
      Validator.isRequired('input[name="gender"]', 'Vui lòng chọn giới tính'),
      Validator.isConfirmation('#password_confirmation', () => {
        return document.querySelector("#form-2 #newpassword").value
      }, 'Mật khẩu nhập lại không chính xác'),
    ],
    onSubmit(data) {
      console.log(data)
    }
  })
  Validator({
    form: '#form-3',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isRequired('#fullname3','Vui lòng nhập họ và tên !'),
      Validator.isRequired('#dayofbirth3','Vui lòng chọn ngày sinh !'),
      Validator.isRequired('#phone3','Vui lòng nhập số điện thoại !'),
      Validator.isRequired('#email3', 'Vui lòng nhập Email !'),
      Validator.isEmail('#email3'),
      Validator.isRequired('#address3','Vui Lòng nhập địa chỉ !'),
      Validator.isRequired('#avatar','Vui lòng chọn hình ảnh !'),
      Validator.isRequired('input[name="skill"]','Chọn trên 3 kỹ năng bạn có!'),
    ],
    onSubmit(data) {
      console.log(data)
    }
  })

const skill = [
    {id: 'skill1',name: 'HTML5'},
    {id: 'skill2',name: 'CSS3'},
    {id: 'skill3',name: 'PHP'},
    {id: 'skill4',name: 'JavaScript'},
    {id: 'skill5',name: 'Git'},
    {id: 'skill6',name: 'MySql'},
    {id: 'skill7',name: 'JQuery'},
    {id: 'skill8',name: 'React'},
    {id: 'skill9',name: 'Vue'},
    {id: 'skill10',name: 'Angular'},
    {id: 'skill11',name: 'UX-UI'},
]

const ks_cboxtags = document.querySelector(".ks-cboxtags")

const tabsLink = document.querySelectorAll(".tab-link")

const tabsPanel = document.querySelectorAll(".tab-panel")

const tabLinkActive = document.querySelector(".tab-link.active")

const line = document.querySelector(".line")


line.style.left = tabLinkActive.offsetLeft + "px"

line.style.width = tabLinkActive.offsetWidth + "px"

tabsLink.forEach((tab, index) => {

    const panel = tabsPanel[index]

    tab.addEventListener("click", () => {

        document.querySelector(".tab-link.active").classList.remove("active")

        document.querySelector(".tab-panel.active").classList.remove("active")

        line.style.left = tab.offsetLeft + "px"

        line.style.width = tab.offsetWidth + "px"

        tab.classList.add("active")

        panel.classList.add("active")
    })
})
const fileBtn = document.querySelector(".file-custom")
fileBtn.onclick = () => {
    const file = document.querySelector("#avatar")
    file.onchange = (e) => {
        const filenames = e.target.files
        for (let i = 0; i < filenames.length; i++) {
            fileBtn.textContent = fileBtn.textContent.replace('Chọn Avatar', filenames[i].name)
        }
    }
}

const skills = skill.map(skill => {
    return `
    <li><input name="skill" type="checkbox" id="${skill.id}" value="${skill.name}">
    <label for="${skill.id}">${skill.name}</label></li>
    `
})
ks_cboxtags.innerHTML = skills.join("")