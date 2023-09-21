const FormAuth = () => {
  return (
    <form action="" className="w-full">
      <div className="w-full gap-4 flex flex-col">
        <label className="uppercase">
        <span className="font-bold uppercase">Email</span>
          <input
            type="email"
            className="w-full"
            placeholder="Email de tu registro"
          />
        </label>
        <label className="uppercase">
          <span className="font-bold uppercase">Password</span>
          <input
            type="text"
            className="w-full"
            placeholder="Contraseña"
          />
        </label>
        <button
          type="submit"
          className="btn text-white w-full px-10 md:w-min"
          style={{background:"black"}}
        >Aceptar</button>
      </div>
    </form>
  )
}

export default FormAuth