import { Link } from 'react-router-dom'
import SocialFooter from 'src/components/SocialFooter/SocialFooter'
import logo from '../../assets/logo.svg'
import email_icon from '../../assets/icon_email.svg'
import pass_icon from '../../assets/icon_pass.svg'
import FooterModal from 'src/components/FooterModel/FooterModal'

export default function Register() {
  return (
    <div className='flex min-h-screen flex-col text-primary sm:pt-10'>
      <div className='flex-1'>
        <div className='rounded-lg bg-card text-card-foreground sm:border sm:shadow-sm mx-auto mb-3 w-full max-w-[30rem] py-2 sm:pt-[48px] sm:pb-[58px]'>
          <div className='flex flex-col space-y-1.5 sm:px-[58px] sm:pb-7 container mb-5 gap-3 sm:mb-0'>
            <img src={logo} alt='' className='w-[130px] h-[18px] object-cover' />
            <h3 className='font-semibold tracking-tight text-lg w-[318px]'>
              Join thousands of learners from around the world
            </h3>
            <p className='text-[16px] text-[#333]'>
              Master web development by making real-life projects. There are multiple paths for you to choose
            </p>
          </div>
          <div className='pt-0 sm:px-[58px] container'>
            <form className='space-y-2'>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5'>
                  <img src={email_icon} alt='' className='w-6 h-6' />
                </div>
                <input
                  type='text'
                  placeholder='Email'
                  className='flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-12'
                />
              </div>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5'>
                  <img src={pass_icon} alt='' className='w-6 h-6' />
                </div>
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                  className='flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-12'
                />
              </div>
              <button className='w-full h-12 bg-blue-600 text-white rounded-xl'>Start coding now</button>
            </form>
            <SocialFooter>
              Adready a member?{' '}
              <Link to='/login' className='text-blue-500 hover:cursor-pointer'>
                Login
              </Link>
            </SocialFooter>
          </div>
        </div>
        <FooterModal />
      </div>
    </div>
  )
}
