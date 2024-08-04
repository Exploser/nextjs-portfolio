"use client";
import React, { useRef, useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { useDarkMode } from "../context/DarkModeContext";

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
  const { darkMode } = useDarkMode();

  const onFormUpdate = (category: keyof FormDetails, value: string) => {
    setFormDetails(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!recaptchaVerified) {
      setStatus({ success: false, message: 'Please complete the ReCAPTCHA to submit the form.' });
      return;
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
      className={`grid md:grid-cols-2 md:my-12 pt-24 gap-4 relative mt-20 ${darkMode ? 'text-white' : 'text-slate-700'}`}
    >
      <div className="z-10">
        <span className={`text-2xl font-bold pb-4 my-2 mb-2 ${darkMode ? 'text-animation-small' : 'text-animation-small-light'}`}>
          Connect with Me,
        </span>
        <p className={`m-4 max-w-md ${darkMode ? 'text-[#ADB7BE]' : 'text-slate-700'}`}>
          I&apos;m currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best
          to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/Exploser" target="_blank" rel="noopener noreferrer" >
            <Image src={`${darkMode? '/icons/light-gh-icon.svg' : '/icons/dark-gh-icon.svg'}`} alt="Github" className="w-12 h-12 mx-4" width={10} height={1}/>
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Image src={`${darkMode? '/icons/dark-yt-icon.svg': '/icons/light-yt-icon.svg' }`} alt="Youtube" className="w-12 h-12 mx-4" width={10} height={1}/>
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
                className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-700'}`}
              >
                Your email
              </label>
              <input
                type="email"
                value={formDetails.email}
                placeholder="jacob@google.com"
                required
                className={`border rounded-lg block w-full p-2.5 ${darkMode ? 'bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100' : 'bg-white border-gray-300 placeholder-gray-500 text-slate-700'}`}
                onChange={(e) => onFormUpdate('email', e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className={`block text-sm mb-2 font-medium ${darkMode ? 'text-white' : 'text-slate-700'}`}
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className={`border rounded-lg block w-full p-2.5 ${darkMode ? 'bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100' : 'bg-white border-gray-300 placeholder-gray-500 text-slate-700'}`}
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className={`block text-sm mb-2 font-medium ${darkMode ? 'text-white' : 'text-slate-700'}`}
              >
                Message
              </label>
            <textarea
              rows={4}
              value={formDetails.message}
              placeholder="Hello, I'd like to chat about..."
              id="message"
              required
              className={`border rounded-lg block w-full p-2.5 ${darkMode ? 'bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100' : 'bg-white border-gray-300 placeholder-gray-500 text-slate-700'}`}
              onChange={(e) => onFormUpdate('message', e.target.value)}
            />
            </div>
            <div className="flex flex-col justify-center items-center">
              {status.message && <span className={`message py-6 ${status.success ? "text-green-500" : "text-red-500"}`}>{status.message}</span>}
              <ReCAPTCHA ref={recaptchaRef} sitekey='6Lcv5dkpAAAAAOomniJd_ADIv7GQKkI4U9UlML3A' onChange={handleRecaptcha} />
              <button
                type="submit"
                className={`font-medium py-2.5 px-5 rounded-lg w-full mt-4 ${darkMode ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
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
