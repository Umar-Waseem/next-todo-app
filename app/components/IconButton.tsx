
import Image from "next/image"

function IconButton({text, onClickFunc, icon, bg_color, padding} : any) {
  return (
    <button
      onClick={onClickFunc}
      className={`flex flex-row rounded ${padding ? padding : ""} ${bg_color ? bg_color : ""}`}
    >
        {text && <p className="mr-2 text-white">{text}</p>}
        <Image src={icon} width={20} height={20} alt={"icon-button"} />
    </button>
  )
}

export default IconButton