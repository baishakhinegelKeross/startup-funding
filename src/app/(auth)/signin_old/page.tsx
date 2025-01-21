import Image from 'next/image';
import LoginForm from '@/components/auth/LoginForm';
import signin from '@/assets/signin.png';

const LoginPage = () => {
    return (
        <div className="lg:grid lg:grid-cols-2 lg:gap-5 h-screen flex justify-center items-center">
            {/* Image Section */}
            <div className="hidden lg:flex pr-10">
                <Image
                    src={signin}
                    alt="Sign in illustration"
                    width={400}
                    height={400}
                    className="w-full h-[700px] object-cover"
                    priority
                />
            </div>

            {/* Login Form Section */}
            <div>
                <div className="flex flex-col md:items-start md:mt-20 gap-10 md:p-10 items-center mt-20">
                    {/* Heading Section */}
                    <div className="flex flex-col items-center">
                        <h2 className="text-white text-center text-2xl md:text-5xl mb-5">Sign In</h2>
                        <p className="text-center text-sm md:text-xl">
                            Welcome back! Please sign in to manage your fundraising campaigns
                        </p>
                        <p className="text-center pb-10 text-sm md:text-xl">and track donations.</p>
                        <LoginForm />

                    </div>

                    {/* Login Form */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
