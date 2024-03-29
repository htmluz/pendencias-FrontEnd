import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

function ModalNovoUser({ fecharModal }) {
  const [formData, setFormData] = useState({
    user: "",
    pwd: "",
    roles: "",
  });
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "Escape") {
        fecharModal();
      }
    };

    window.addEventListener("keydown", keypress);
    return () => {
      window.removeEventListener("keydown", keypress);
    };
  }, [fecharModal]);

  let permission = document.cookie;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/usuarios/new", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fecharModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed text-black bg-[#00000080] top-0 left-0 w-full h-full z-1000">
      <div className="bg-white w-1/4 mt-20 ml-auto mr-auto rounded p-4 pb-0 shadow-modal">
        <div className="relative flex flex-col w-full pointer-events-auto p-5 pb-8">
          <div className="font-Inter font-bold text-lg flex justify-between align-top text-right mb-2 pb-2">
            <h5 className=" select-none cursor-default">Novo Usuário</h5>
            <button
              onClick={fecharModal}
              className="  hover:text-[15px] transition-all"
              type="button"
            >
              <AiOutlineClose />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="font-system font-semibold"
            method="POST"
          >
            <div className=" pb-3">
              <label className="select-none" htmlFor="user">
                Usuário
                <input
                  required
                  id="user"
                  onChange={handleInputChange}
                  name="user"
                  type="text"
                  className="font-normal px-2 mt-2 transition-colors focus:outline-none focus:bg-[#dddddd] leading-9 bg-[#efefef] rounded w-full"
                />
              </label>
            </div>
            <div className=" pb-3">
              <label className="select-none" htmlFor="pwd">
                Senha
                <input
                  required
                  id="pwd"
                  onChange={handleInputChange}
                  name="pwd"
                  type="password"
                  className="font-normal px-2 mt-2 transition-colors focus:outline-none focus:bg-[#dddddd] leading-9 bg-[#efefef] rounded w-full"
                />
              </label>
            </div>
            {permission.includes("777") ? (
              <div className="pb-3">
                <label htmlFor="roles" className="select-none">
                  Permissão
                  <select
                    required
                    value={formData.roles}
                    id="roles"
                    name="roles"
                    onChange={handleInputChange}
                    className="font-normal px-2 mt-2 transition-colors focus:outline-none focus:bg-[#dddddd] leading-9 bg-[#efefef] rounded w-full"
                  >
                    <option value="">Selecione uma Permissão</option>
                    <option value="777">Administrador</option>
                    <option value="666">Usuário</option>
                  </select>
                </label>
              </div>
            ) : null}
            <div className="mt-3">
              <button
                type="submit"
                className="cursor-default transition-colors  bg-[#187bcd] hover:bg-[#1167b1] rounded px-3 py-2 w-full text-white"
              >
                Criar Novo Usuário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalNovoUser;
