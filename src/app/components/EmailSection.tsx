"use client";
import React, { useRef, useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

interface FormDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface Status {
  success: boolean;
  message: string;
}

const EmailSection: React.FC = () => {
  const formInitialDetails: FormDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState<FormDetails>(formInitialDetails);
  const [buttonText, setButtonText] = useState<string>('Send');
  const [status, setStatus] = useState<Status>({ success: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const onFormUpdate = (category:any, value:any) => {
    setFormDetails(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!recaptchaVerified) {
      setStatus({ success: false, message: 'Please complete the ReCAPTCHA to submit the form.' });
      return;
    };
    const target = e.target as typeof e.target & {
      email: { value: string };
      subject: { value: string };
      message: { value: string };
    };

    setIsSubmitting(true);
    setButtonText('Sending...');
    console.log('Form details:', formDetails);

    try {
    console.log('HELLLo');
      let response = await fetch("https://personal-blog-api-two.vercel.app/send-email", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              firstName: formDetails.firstName,
              lastName: formDetails.lastName,
              email: formDetails.email,
              message: formDetails.message,
              phone: formDetails.phone
           }),
           credentials: 'include',
      });

      let result = await response.json();

      setIsSubmitting(false);

      setButtonText("Send");

      setFormDetails(formInitialDetails);

      setRecaptchaVerified(false);

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      if (response.ok) {
          setStatus({ success: true, message: 'Message sent successfully' });
      } else {
          setStatus({ success: false, message: result.message || 'Something went wrong, please try again later.' });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setIsSubmitting(false);
      setButtonText("Send");
      setStatus({ success: false, message: 'Failed to send message. Please try again later.' });
    }
  };

  const handleRecaptcha = (value: any) => {
    setRecaptchaVerified(!!value);
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 md:my-12 pt-24 gap-4 relative mt-20 "
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <span className="text-white text-2xl font-bold pb-4 text-animation-small my-2 mb-2">Connect with Me,</span>
        <p className="text-[#ADB7BE] m-4 max-w-md">
          I&apos;m currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best
          to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      <div className="my-8">
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">Email sent successfully!</p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                type="email"
                value={formDetails.email}
                placeholder="jacob@google.com"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => onFormUpdate('email', e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
            <textarea
              rows={4}
              value={formDetails.message}
              placeholder="Hello, I'd like to chat about..."
              id="message"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => onFormUpdate('message', e.target.value)}
            />
            </div>
            <div className="flex flex-col justify-center items-center text-white">
              {status.message && <span className={`message py-6 ${status.success ? "success status-txt" : "danger status-txt"}`}>{status.message}</span>}
              <ReCAPTCHA ref={recaptchaRef} sitekey='6Lcv5dkpAAAAAOomniJd_ADIv7GQKkI4U9UlML3A' onChange={handleRecaptcha} />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
                disabled={isSubmitting}
              >
                <span>{buttonText}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
