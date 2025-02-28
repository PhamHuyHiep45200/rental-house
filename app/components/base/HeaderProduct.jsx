import React from "react";

function HeaderProduct(props) {
  const { icon, title, color, fontSize, center, textColor } = props;
  return (
    <div
      className="flex items-center py-3 pl-5 mb-2"
      style={{
        justifyContent: center ? 'center' : 'flex-start',
        background: center
          ? `linear-gradient(90deg, rgba(255,255,255,1) 0%, ${color} 51%, rgba(255,255,255,1) 100%)`
          : `linear-gradient(45deg,${color ?? "#ffce76"}, #fff)`,
      }}
    >
      {icon}
      <span
        className="font-bold text-[25px] ml-2"
        style={{ fontSize: `${fontSize}px`, color: textColor ?? 'unset' }}
      >
        {title}
      </span>
    </div>
  );
}

export default HeaderProduct;