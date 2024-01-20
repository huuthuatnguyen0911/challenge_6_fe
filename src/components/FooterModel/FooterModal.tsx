interface Props {
  className?: string
}
export default function FooterModal({ className }: Props) {
  return (
    <footer className='container mx-auto hidden text-sm text-secondary sm:block'>
      <div className={`mx-auto mt-1 flex items-center justify-between text-[#828282] ${className ? className : ''}`}>
        <p>
          <span className='sr-only sm:not-sr-only sm:mr-1 sm:inline-block'>created by</span>
          <a
            target='_blank'
            className='font-semibold underline hover:text-link focus:text-link'
            href='https://github.com/huuthuatnguyen0911'
          >
            HuuThuat
          </a>
        </p>
        <span>devChallenges.io</span>
      </div>
    </footer>
  )
}
