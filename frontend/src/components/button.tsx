function Button(content: string, link: string, target: string, textSize: string = 'sm'){
    return (
        <a href={link} target={target} className="h-full flex items-center px-7 py-2 rounded-full border-2 border-primary hover:bg-primary transition delay-100 hover:cursor-pointer">
          <span className="text-neutral">{content}</span>
        </a>
    )
}

export default Button;