
document.addEventListener('DOMContentLoaded', () => {
   
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            
            const nameInput = document.getElementById('name').value;
            const emailInput = document.getElementById('email').value;

            
            const formData = {
                name: nameInput,
                email: emailInput
            };

            try {
                
                const response = await fetch('http://127.0.0.1:8000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(formData) 
                });


                if (response.ok) {
                    const result = await response.json();
                    alert(`Gửi thành công! Đã tạo contact ID: ${result.id}`);
                    contactForm.reset(); 
                } else {
                    const errorData = await response.json();
                    alert('Có lỗi xảy ra: ' + JSON.stringify(errorData));
                }
            } catch (error) {
                console.error('Lỗi kết nối tới Server:', error);
                alert('Không thể kết nối tới Server Backend!');
            }
        });
    }
});