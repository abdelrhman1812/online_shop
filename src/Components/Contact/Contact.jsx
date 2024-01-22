import Aos from 'aos';
import emailjs from 'emailjs-com';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
export default function Contact() {

  useEffect(() => {
    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);




  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_g766uce', 'template_mhfp2us', e.target, 'RYOyrKWRFVWTDR50M')
      .then(res => {
        console.log(res)
        e.target.reset();
        toast.success(
          <div className="text-center">
            Thank you, my friend. I will reply back to you
          </div>,
          {
            duration: 3000,
            icon: (
              <div className="fa-2x text-danger">
                <i class="fa-regular fa-circle-check text-success"> </i>
              </div>
            ),
            position: "top-center",
          }
        );
      }).catch(err => {
        console.log(err)
      })
  }



  return (
    <>
      <section className="contacts ">
        <div className="container ">
          <h4 >  <i className="fa-solid fa-headset"></i> Need Help ? <span data-aos="fade-right" data-aos-duration="1000"> Contact Us </span> </h4>


          <div className="row">
            <div className="col-12 col-lg-4 ">
              <div className="contact-details">
                <h2 className="px-3" data-aos="fade-right" data-aos-duration="1000">Contact Details</h2>
                <p className="px-3" data-aos="fade-right" data-aos-duration="1000">Get in touch with us for any questions about our projects.</p>
                <div className="icons">
                  {/* Add keys to social media icons */}
                  <div className="location d-flex p-3" key="location">
                    <i className="fa fa-location-dot py-1"></i>
                    <div className="text mx-2">
                      <p className="" data-aos="fade-up" data-aos-duration="1000" >Office Address <span>Industrial Obour city Zone B,C No 27001, Cairo, Egypt</span></p>
                    </div>
                  </div>
                  <div className="email d-flex p-3" key="email">
                    <i className="fa-regular fa-envelope"></i>
                    <div className="text mx-2">
                      <p className="" data-aos="fade-down" data-aos-duration="1000">Email <span>abdelrhman@example.com</span></p>
                    </div>
                  </div>
                  <div className="email d-flex p-3" key="phone">
                    <i className="fa fa-phone py-1"></i>
                    <div className="text mx-2">
                      <p className="" data-aos="fade-up" data-aos-duration="1000"> Call Support <span>+(345) 206 7849</span></p>
                    </div>
                  </div>
                  <div className="social" data-aos="zoom-in" data-aos-duration="1000">
                    <i className="fa-brands fa-facebook" key="facebook"></i>
                    <i className="fa-brands fa-google-plus-g" key="google"></i>
                    <i className="fa-brands fa-twitter" key="twitter"></i>
                    <i className="fa-brands fa-linkedin" key="linkedin"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="send-message" data-aos="zoom-in" data-aos-duration="1000">
                <h2 >Send a Message</h2>
                <form onSubmit={sendEmail} className="form">
                  {/* Fix my-2 class placement */}
                  <div className="input-name my-2">
                    <input type="text" placeholder="First Name" name='name' />
                    <input type="text" placeholder="Last Name" name='lastname' />
                  </div>
                  <div className="input-contact my-2">
                    <input type="email" placeholder="Email" name='email' />
                    <input type="tel" placeholder="Phone" name='phone' />
                  </div>
                  <div className="input-info my-2">
                  </div>
                  <div className="message">
                    <textarea name="message" id="" cols="30" rows="7" placeholder="Message" ></textarea>
                  </div>
                  <div className="btn-form">
                    <button className="btn" >Send Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="map ">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54695.26706171558!2d31.341639919525356!3d31.041453146577258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79db7a9053547%3A0xf8dab3bbed766c97!2sMansoura%2C%20Mansoura%20Qism%202%2C%20El%20Mansoura%2C%20Dakahlia%20Governorate!5e0!3m2!1sen!2seg!4v1686262002548!5m2!1sen!2seg"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
