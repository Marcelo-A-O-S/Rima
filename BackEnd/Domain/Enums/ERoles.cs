using Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum ERoles
    {
        [StringValueAttribute("Gestor(a)")]
        Gestor,
        [StringValueAttribute("Adiministrador(a)")]
        Admin,
        [StringValueAttribute("Desenvolvedor(a)")]
        Desenvolvedor,
        [StringValueAttribute("Secretário(a)")]
        Secretario,
        [StringValueAttribute("Mecânico(a) Automotivo(a)")]
        MecanicoA,
        [StringValueAttribute("Mecânico(a) Industrial")]
        MecanicoI,
        [StringValueAttribute("Eletromecânico(a)")]
        Eletromecanico,
        [StringValueAttribute("Soldador(a)")]
        Soldador,
        [StringValueAttribute("Carpinteiro(a)")]
        Carpinteiro
    }
}
