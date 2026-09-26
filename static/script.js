document.addEventListener('DOMContentLoaded', () => {
   
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email })
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Gửi thông tin thành công!');
                    contactForm.reset();
                } else {
                    alert('Có lỗi xảy ra khi gửi dữ liệu!');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Không thể kết nối tới máy chủ!');
            }
        });
    }
});