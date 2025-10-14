import React, { useEffect } from 'react';

// INSTRUCTIONS:
// 1. Make sure you have Tailwind CSS configured in your project.
// 2. It's recommended to add the Google Fonts import to your main index.html or global CSS file:
//    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
// 3. Add these base styles to your global CSS file for the correct look and feel:
//    body {
//        font-family: 'Poppins', sans-serif;
//        background-color: #FDF8F3;
//    }
//    h1, h2, h3 {
//        font-family: 'Cormorant Garamond', serif;
//        font-weight: 600;
//    }


const AboutPage = () => {
    // useEffect hook to run animations after the component mounts
    useEffect(() => {
        const setupAnimations = () => {
            const gsap = window.gsap;
            if (!gsap) {
                console.error("GSAP not available.");
                return;
            }
            gsap.registerPlugin(window.ScrollTrigger);

            // Select all elements with the 'gsap-reveal' class and animate them
            gsap.utils.toArray('.gsap-reveal').forEach((elem) => {
                gsap.fromTo(
                    elem,
                    { opacity: 0, y: 50 }, // Starting state: invisible and slightly down
                    {
                        opacity: 1,
                        y: 0, // Ending state: fully visible and at original position
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: elem,
                            start: 'top 85%', // Start the animation when the top of the element is 85% from the top of the viewport
                            end: 'bottom 20%',
                            toggleActions: 'play none none none', // Play the animation once when it enters the viewport
                        },
                    }
                );
            });
        };
        
        const gsapCoreURL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js';
        const scrollTriggerURL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js';

        let script1, script2;

        if (window.gsap) {
            setupAnimations();
        } else {
            script1 = document.createElement('script');
            script1.src = gsapCoreURL;
            script1.onload = () => {
                script2 = document.createElement('script');
                script2.src = scrollTriggerURL;
                script2.onload = setupAnimations;
                document.head.appendChild(script2);
            };
            document.head.appendChild(script1);
        }
        
        // Cleanup function to remove scripts when component unmounts
        return () => {
            if (script1 && script1.parentNode) {
                script1.parentNode.removeChild(script1);
            }
            if (script2 && script2.parentNode) {
                script2.parentNode.removeChild(script2);
            }
        };

    }, []); // The empty dependency array ensures this effect runs only once

    return (
        <div className="text-gray-800">
            <main className="pt-16 md:pt-24">
                <div className="container mx-auto px-6">
                    {/* Section 1: Our Mission */}
                    <section className="grid md:grid-cols-2 gap-16 items-center my-12 md:my-20">
                        <div className="gsap-reveal">
                            <img 
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto.format&fit=crop" 
                                alt="A group of students studying collaboratively for their exams" 
                                className="w-full h-auto object-cover rounded-lg shadow-xl"
                            />
                        </div>
                        <div className="gsap-reveal">
                            <h1 className="text-6xl md:text-7xl mb-6">Our Mission</h1>
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                We understand the challenges and anxieties that come with preparing for crucial entry tests like the <strong className="font-medium">NET, NAT, and MDCAT</strong>. Our mission is to empower every student with the knowledge, skills, and confidence they need to ace these exams and secure admission into their dream universities. We believe that with the right guidance, every student can achieve their academic goals.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Our Approach */}
                    <section className="grid md:grid-cols-2 gap-16 items-center my-12 md:my-20">
                        <div className="gsap-reveal md:order-2">
                            <img 
                                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto.format&fit=crop" 
                                alt="An instructor mentoring a student" 
                                className="w-full h-auto object-cover rounded-lg shadow-xl"
                            />
                        </div>
                        <div className="gsap-reveal md:order-1">
                            <h2 className="text-5xl md:text-6xl mb-6">Our Approach to Excellence</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                Our preparation material is meticulously designed by subject matter experts and experienced educators. We provide comprehensive notes, extensive question banks, realistic mock exams, and in-depth video lectures that cover every aspect of the syllabus. We focus on building concepts from the ground up, ensuring you're not just memorizing, but truly understanding the material for tests like etc, etc.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            
            <footer className="bg-[#ECE5DD] mt-20">
                <div className="container mx-auto px-6 py-12 text-center text-gray-600">
                    <p>&copy; 2024 PrepSuccess. All Rights Reserved. Your Future Starts Here.</p>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;