<template>
  <v-app class="app-background">
    <v-main>
      <v-container class="py-11">
        <!-- Section pour afficher les informations de l'utilisateur -->
        <v-container class="d-flex justify-space-between align-center mb-4">
          <div class="d-flex align-center">
            <v-avatar size="100">
              <v-img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhIWFRUWFRUYFRgVFRUXFxYVFRUWFhUVFRcYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACBAEDBQYABwj/xABBEAABAwEFBAgDBgQGAgMAAAABAAIDEQQSITFBBVFhcQYTIoGRobHBMtHwFCNCUmLhB3KC8TNDkqKy0nPCFRYk/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EADYRAAICAQMCAwUHAwQDAAAAAAABAhEDBCExEkEiUWEFEzJxgRRSkaGx0fAjweEVM0LxJDRD/9oADAMBAAIRAxEAPwD5aAsBUeIQIgIGGAkB4hFAQpdIAOKaiBSQrBnkUB4FOgJBRQASNUUyR4OToiS0p0MYjKg4iYy1yraIs0mbEndAJ2xlzC6gugl3810Y3ailVatPkcOtLYmsM3DrS2LOj+xH2qUMbUNH+I7Rg/7bgpafA8sqX1HhxPJKl9fQ7jpV0ShFkrBEA+KhBA7TxUNcHHNxxrjqF0dTpYqHgW6/M6OfTR914Vuj2yv4ew9VScl0rmnFriGxkjC6B8VOKjHQR6PFyVw0kUvFyfNHtLSQcCCQeYND5rltHPap0yyzzYqLiBr2ZypaAaDaqAhaeAJpioUks9MlamBZA5RaLEN0wSGJWliaZVJARx1SbIkmEoskgBCn1E7A+xE4qzqJWZDCrWiNBEpUIiqKAmqKAiqKGSVJIRUVKhglMYJCBUP9HtkPtUojaQ0Uq5xFQ0DhqcRgrsWJ5JUi3DieSXShnpL0clsTw2SjmO+B7a0dTMEaO4IzYXjdMnmwSxPfjzG7Z0OtQszZwy9Vt50YB6xoqaGmuGJGYrkk9JkjFS/iJ/ZZ9Cl+RytVBGUkFOgGY3KLQGnsiyddKyIGl9wBO4ZuPgCjHi65qPmEIdclHzPtsMTWMYxgutaAGgZAAYBd9JJUjvQioqkMsYMab0iQWY7x5YphWxe3BRINHyzpR0MfGy0WrrAe254YGmoY6TEl28BwNKaFcrNpHCLnfc52fSOKlks4hhWNmE07LaKDFUyQjShnqq3ECxxUaAgsQBSyPFSslEN1UiYDsUEWgWKLK6LTGdyiBTkeakFjQeEgs5ALoFh4lKgBqnQBNSAMBABgIEA5iYWAWJjNjoZFW3QfzOPhG4jzV+m/3V/Oxbg3yxPp7tlRslMsbGtc8dsgAXqb6cyurGCTtI7EIJO0uRvauy2WmNrZBg18cg31Ya0x0OI5FE4KaV9nZZkxrJGmaOYBH1v9lMDhunvQcTB1psraS5yRjKTe5o0fw15549Rp78UTFqNN1+KPP6/5PlYjXPs5YxGxRbEdp/D2w3pXSn/LAA/mfX2B8Vt0MLk5eRs0ULm5eR9QIy+ty6R1EXtPuUg5PRtwbxNUyReQkRFNpQh0UrXZOjeDyLSCoZEnBp+Q2k1TPz/HovPNnnFwNMULEMQzEIaAfitIKqaGXCRRAm8glEMkJlyQBjSbItFkQASKZFNotzBhmkokRN1oBOBUqHZcJQUhHP8AVrdZaQY0WAIjRYB3EWATWJWBY2NJsiGYUdQzb6HbGjtEzmSgkCMuABIJIc0UqOBK06XHHJJqRfp4Kc6kfT9mbMs8TR1MTGV1AxNd7sz3rrQxQh8KOrDHGHwovcKKwtSL2DBBNMCLAlvePcIBhQmhLT3ckET53/EjouGn7XE2gcQJgMrxwbJ35HjQ6lc3WYun+ovqc/W4P/ovr+5xQspAyXO60cw+h/w/gpC47318G0XY0C/pX5tnU0S/pt+p2TzkthsRaXV8EgWxfHmOAQFloCQjM6Sy3LLO7XqpKcy0geZCp1EunFJ+gpyqEn6M+HNiXnbOAXtagRBCaGSAmAwxxVUkIva9RJpl0JQy6JeVEGK2lMqkhAsUioEMTAO4UDKTAreouojqEdQEdQjqEF1KaYBMgSbEXNgUbAs6pKwNfolN1VpadHAtPfiPMBbdDkrMl52v5+Bo07rIj6Sw0x0PkT9eq7qOtFl0jKhBNA2ST8Jz90DZZK3yyQS5RVKcnDMZ8j+/qgjQc0DZY3McKtcC0jgQozipxcXwxNJqnwzhv/gbtWkVoSP3XkMvVjm4PlHBnj6JOL7G30YswYxzRv8AmvTaD/14/wA7nU00axo1bU+j2j9NVrRpS2LQ7AcUCG43ZpCotYUCo5v+IVou2W5rI9re4ds/8R4rB7RnWKvN/wCTPqpVja89j5gYlwjkUQI07Ee6tSTGT1SdhR4sUXuIi6VEEM2ZyTLosbqok2VSMqmiuQsIaZqRTQBhGhRY6JDUBQbYVJstC+zpWBDrOiwBEClYFrIFFsRcIErER1KLGGyOhBGYNRzCcZuMlJdiSdO0fQNg2sSMo7Iih4FeoxzWSCku52Iy6kpI0IJC1xY/MZHeNCrOS71QdojIN4d6Q1uWh94JkivgdfooArssl0lpzHmN6CMl3Bt8PavaHPmPryXnva+Hpmsi7/qv8foc3Ww8SminZbKOdz9gup7Od6WH87mjB/to9tAfe/0D1K2o1R+Etr2m+KCNbDTD2RxSAthcgTRx/wDEOSr4mbmucf6jQf8AEri+05eOMfQ52slwjjupXNMDLoLA52IGG/TxV2LT5Mvwrbz7F2LBPJ8KG4NiXv8AMYPFbV7MyfeX5mr7BLzQ5H0ZrlM0n+U/NS/0uX3l+A/sD+9+Rh2iylri1woRmFzZRcW4vlGCcHF9L5AESgKgoosUiURhrFEsZ52CZFoRmBJUkQoBrEwoO4kFGn9nSskEIEhEOgTsAfs6LAJkKLAt6pIKOw2bsWDqmOdGCS1pNScyOa9Bg0eF44ycd2kdbDp8bgm0WTdG7M/IFh/SfY1CeT2dhlwq+RKekxvtQjFsiWzuqO2zeMwOLfknpcOTBcJbx7MMOKWO48o3HsErAW/G34T6tPNbC+L6XT4LLFPeFDmMCE2ElTPAXTTQ+qESQT0DaFNoCgEgzbny1CBxV7Mte7rIjTEgVHdisuuwe9wyj9V9DPnx9UGhDo9ahIXEb6eSp9lv/wAZLyb/AHKNK7xfUYthrKeAaPMLoI3VsekPb5N9SgSWwy92Q3AICqRbG7ED64II1Ss4rpY+/aX/AKQ1vgKnzJXnNdPqzy9Njkap3k+RGx9i3+3IOzoPzfsr9Houvx5OOy8/8fqS0+m6/FLg1NpwhrKAUFRlu3Ls0kqR1EqVI5+VhQNOgGSuacCQhMkmNOtDX0vtBIGFRkozxY8nxRTIyxwn8SsB9kjING0NMCK58lkz6HE4NxVMz5dJj6XSoQES4ByUFcSLCqRqYFDmJkGVliYjwAQBt9WoDJDExHurSA91aYBQ2cucGjMkAcypQg5yUVyxxVujZ/8ArEn52efyXR/0vJXxL8zYtFJ9zfscRZG1rs2gA0ywwqF2MMXHHGMuUqOhii4wSYT2HMZq0uJgtGhwKBOIbYgDebhvGh+RUSDV8gWmLHrGZ/iG8fNCY191h1D21H0UEeHuU3tNR6Jlsd9iA4Go3p0FUZ2zrR1chjJw05HL5IROUbVleyIOqnlYPhLrzf5XZeGXcsWjx+6eTH62vk0YsWPoc4+t/iMvk+9d/T6H5LajZKOyAhlq9x4geGKAcOxex9Tzx+u5FCki+yyjtyH4Wg+AH7KE5KMXJ9iGXZUcxYLGZpHPdkXFx4kmtFw9Jp3nm8k+L/F+RycWJ5ZuUuDoy0ALunSihSWO/wAQgk9kD9nGQCKIoqtGymuGWO9JoGzLl2K4ahFAmJy2ZzePJBKyCKg1+u9c72jjxrF1VvZj1UY9F1uU0XDOfZRIEDK7qYnEi4nQuk91aKFRsXVAlR4sQI9RMRFEAWQscSLoJOYoKnBTxqTkujklFNvY7SGUlrS4XXECo3FeqhJuKbVM7WO+lWWFTLDxYlYWBJEHZ4Hf9ZoBSorinLDR3cUEnHq4GWvBySI0LSC6bwy1G7imiVWqBndXtNzCdDihCW0UxBwPru5pmhQtGVtmal2UaGh4g/QPih7bk4woZs9tDnsfqQQe41Hul0rqvzISw72A61ASOPEeQTRZLHwVWS1dknVznevyCAWPcZfaroJ1PZHMoIdG4xaq9U2Fub/iO5oxJKx6uMsiWKPfn0Rg1KcvCu/6DcETY2ADAD6qr4QjCKjHhChjpUis1dicBpxUy11HZBnJOiugoWoItl9MEhFD2ooYrLZQdEUMStex3FvYpWtaHVYtbgllglHsZtRFzVI5uR1CQcwaHuXn3Fp0znVTpg1USVgEqSE2eaU7I2WgBKws1KKJIgoABBEmiANbo5OGyFpwvDA8Roul7MyKORxff+xp00umdeZ0bgu6dVMENIyxQSDEm9AqCISEVvaCKUqgE2hN7HMxZiNW6j+U+yZcmpchR2xrhn8xzCKH0NCtokuY/hPl+ykWqHUZNtnFdwOfA6EJl8E0Zk1prejdkQQfYhLkv6DP2ZbiCGE4tdQ91fXBQjLsytR237Dctp+I1+qKV1uXOO4VmcQGjcP2+fimiLjSGoZ70mOLYxjxcUdylrY2orSG1c+lfqgCVLkyvF1PYJkpdi7LQfNOiMlWyGA8cykUNBgalBB+gTX7kiLCMiBUUvtDU7HRMctdCErIsR27tcQsoPjcOzwGrli1mo91Cly/5Zmz5OhepxjpgFwGjnWVmWqVE0gmBAOiwNTIE1KVAbBKRYDVKgIKYmeqgCYbxcLvxVFOeinjUnJdPPYkrvY7poOudF6s7K4JLUErIIGqQE0KBAlyCS3KJSpImkZltjaf0u0cPfeijRBsybRtB8WEmLd+h57ik3XJphGL4ELTM1wN3Ldu5fJF/gaOnuZDJavDDU7rovGnAcFl1Gf3cW9rXFul+JNyUVuMttdmdaHthiMkLavnlcCJIWwtq6goDiQBlrRefyazVKEM05KM3sor4ZNulfPb1OPPVTtSXqnXZrjYbte1BS7JY5vssT47rrhEjxMALhJIHxO0O4YLNiz5bnljmj72fa/Cq71v2W1+b5Ix1UoqeT5Jet969CbVaYo45fu5BJ1jeqcRWNzXAENDgaFwae1xXU0ut1GXURqS6FHxLh9XF1zVrb05N6zSyZelcJb/ADFbHJdG/XiSV3oukXdFofZaTm446DRoUyEo9h2y2gu1w3nXkgzzhRqWeQZNHfp46pMyTi+4wBqUipgOk0bjy90hdPmQIXO+I04D5oE2lwWNiAyCKK3uI7W2syBtTi8jstGZ4ncFnz6iOJb8+RTlyxxrc4W1Wp0ji95qT5cBwXGk5ZJdUuTmSk5u2VpOAI81+KplGhjcarBsMmiZAG+pUBrF6gXEXkCPX0ACXoAvsFp6t7X0rQ5equwZfdZFOuCUJdMkzuYZGvaHDEEYL0sZKSUlwzrRkpK0WVTJE0QCYJagdgPTJKhSd2/zTLYJ9jIt7uPuma8fqjBtU7sQcR4obNKijmtozFmMTqb21w/p+Sy5PCriyOTI4K4s6Nu07NI9kDI5o/u2C+6JzXkvJvfeAVYSW1qWlpumlM14rP8AaZKWXJKMt3tdrbjbv+Nr1ORPUTlkp3v/AD6HU2OwNBcBCwQyMq407bycCHVxIpv4rh5M0mk3J9Se3kvl2Jtb7Ggwt+EEYZDA4AinhRZ3fIP1Oe2rZZbNZyY3N6x0r7pJDYohLUA00DRTLEknDtYdTS5oZcy6lskvVy6f3/CvkQtwXh/Pj/oyukV5r2Fzoi4tDaR1GDfxkY0rWmemq9T7D1CljlGPU97uXr2T9Dr6PxQrf5+pnxvrpePg3916KLsvkqNaxkHFxr6KwyzvhG3ZpK4Nb7BBjnDzHRBX4z3DL90ihtLgsFBgAgrdsBzjuRuLpM62m0nCMMbxc6p7hSg81mzR1D2x0vVv/BVkhle0aRzVs6OWpxLuy8nPt4nxoubLQai7dP6/uYZaLNdumZE9jljwkY5vMYdxyKg8cobSVFEscofEioooiSGqnKqGx2FZGxFro6pWQZHUlPqQDIkU6LgTMihHutRQWR1iKGH1qVAbGwNtiIlr63D/ALTvpuW/RapYvBPj9DRgzdDp8HXQTNeA5pqDqMV3IyUlado6UZpq0WXUx2iDVIdIB0m8FMai+wvPI3kmi2KkY9va0g0I9EzXjb7nJ7Vje09jmcR7pS9C932ON2ranE1oK8hmNVzs9s5uqzM73oxtqScQdTG1jGgtnPaF95Aq8G7QkU76kVXitdpseJzU3vzH0Xlz/PIpxZHNdS+vJ3gbrfLgWkcBXI0zB+a4d+hZ3FYnXXEYUwpmaCmGmdaqb3RJpsOeJhoZbhAcCy8G9hxFAQTkcTjxShKS2hfrXci0cbPaJ4WTGWaCYPcYy1rGAxuJJxIoXGhGYya0r02hx4c2SCipR6fEt3T/AGV+Xm0XaTHKU7lLjj0MkWpumHf75r2GKUuGdTpvk1dn2xmtPJak0VTj5G/Z7dH+bz+SdmKcWOttbPoFIzuLLWzjcUWVuyS/9KLZHc9eO5PcXiG4GgjFDE3JEzWVjgWkAg5g4jwUXuqaF1Puji+kfRUsBks4q38TMyOLd44Ln59P0+KHHkYc2Bcw/D9jmIyufk3MwzGVhkqIDbQs7ZFllEWIzjMt1FgBmRQiOuRQw2yooCeuSoZIlRQDNi2pJEasdTeMweYVuLNkxfA/2Jwyyg/Czcs/TAj42d7Xex+a6EPaX3o/h/P7mqOt+9Eej6XxHO8ObQfRXrX4X5r+ehctZi72i8dKYD+Lxa75KxazB978mTjqsP3vyZD+kMH5h5qX2rD94tWqw/eEZdpxSfCC7k1x9AnHU45bR3+SZoxazHLaLb+SZgbXmccGMPGoA9SFN+iN9ya4OG2p2TQgGmn9qLFmXmcvVquTrLBaYWQxTWabK5FPGG333n432sqKBpJwGJpngvKZ4TyZZ48sPOUXdLbtfr/EUwyNRTg7S248/wBjvNlbQjqQ2Vsl0NvObQ6VBoMq0JouBmwzjzFqzVakth6W1NADq5ns1wqdMDnhiqVCTbQLyMTaG0opJXWY3XuLWjqX3SHV7TnNBoSQ2uOmFQM1uw4MkILNul95X8v1E3G+m9/I5C3vETBZInNkha9z29mj2vLnAsdpUVPw54L1Wgxdc3qckWptVzaa23Xz9To6TDCCvpoqhLRoBuqKVXfxmuXSaNik3tHdl6LTEplRvWSZooKeikZZ79zUhlGg9EzLJepcD9VCRWyt1UxbF0T0xUNMkCjRBxYw14KW5BxaMXpbtGaGGsMZcTgXAAiMfmI1PlvWbU5Jwj4V/gpyymo3FHzGGcuJLjUk1J3k5lcVtvk5ybfI2x6y5BM0IHYLHIgy8OSEYJcupRYDeQI9VFAFeRQE30qGevpUMm8ihFlnhe80YxzzuaCfRSjBydRVjUXLhG7Yeilofi+kY/Uanua33IWzHoMsudi+GkyS52NyzdD4h8bnvPc0eAx81rj7Pxr4m2aY6KC+J2Px7Es7P8pn9VXH/cStEdLhjxH+5phpsS4iU2t4ya2vkFelXB0Mca9Dl9tVDTvpgGjVDNaqjg7fZTQueaE5A5nisOWL5Odmx9SbZZ0W6Qy2NxbExpvvaSS28ezWgodMdKFcXW6GOorqb2T2+Zzcb93Jrp2Z0uzp7Tar77KRGyMNE4Z2A0udflfEwVvGgrU44jQLl5seHBUcytu+m9+Nkm9q/Qvjlck+lU+5rWHbEMkzY55BdYb4cZQWuLa3ZA4gYAClONMVknpcsYOWOPOzVbrzVGltNVe/JiWTpHMZGyshY1zCRfLjIXt/ECa9gHA0GA0wXXh7IjOLjKTp9qpL9/1LtPgllTbVeXcVm2iTM4ytDQ9xcM7mPH3XXwYfcxUG+FVmyOR4vBL8TVjhByHcOVe9dOEWlv8AiaOqx6CwiuXz+RVsN1sUylRpQWQDf5FTMs5IfhioMEGeQ1GEFT2GWt4IK2ywMG5IXUWXBuQFgOlDUBuDa7fHEwvkddaMyQTnyUMk4wVyexCclFWz5ZtieF873QNusJwFKY6kDQE6LhZ5Qcm4cHMySjKVxIgBWKbK2aUTFlaI0WXSlQjDIXQsmCQnYEoERVMDyAHdl7NlnfdjbU6nJrRvcdFZjxTyOooshCU3SO42V0NhZQynrXbjgwd2vf4LqYtDjjvLd/kb8eljHeW50cUDWijWgDcAAPALYqSpGlUtkE4gIJJNgOJPBBJUheSMa4p2TUmJWipwATLoUjGt9kFKnyy/dJmqErOZm2LUl8hrw3DdzVcoq9w6It9UjNk2GQKtFL2GOYac6d2HeqZYRfZ1v/NjGOxnF5AJa0kAgE4iuFaZrJ7m5fIxz9mdU77DmxNmBsz4xl1dd+RaUljdtd6LtPpoYMzjHyNKzQhppofI/wB/VaMeNo6S8I++xteLjhX1HJaVjtUyGRKS3RVBZpbPStXx6EZt4IScNjLbht2OisVoaRXPfhSiuTsi8lmgyNpyJHf80ymUi2Nrh+IHmgqdDcbjqPBIqkXNolZWy2pGp9UmR5K3THe095aiyVHO7b2v1UlXg3TQCmONNCq5544lcivJkjBbnN7Z6UulaYmNusOdcSca8hiuZqNY8i6YrYwZdS5KkYkBxWCTM5s2WOtFlkxmrHFgqrE0T1aAowLi22MFzE7AAhOwIuosQzs+wumkbGzNx7gNSeACtx43kkoolCLk6R9T2Vs6OCMRs7zq52pK72LHHHHpidfHj6FSHQQrCw8SigSBJSJUVuenRKgTHvQCl5FUzaCgCZOLt2IzWbV2g8EIujPyEfsHWGpFGjIf+xSLlk6TI23mTo0UHskzVj2VGLYbPVzeLj5NPuqowolOVAWWzkW4tyvR09PklGP9T6GaUqzX6D89gIcR3+P9lYo9jR1WNWSzE4H4m58Rv9lPeiDlRr2eBpFCE+TPNuwRYQw4irdDkRwr7ZJUZ5+g2LCSLze0OGDhzGvd4I4KXMGNl7JwJGYycOYSU0+CPvFdFrWEbwnYWi+MHeiiDoaZVKiLoptMjGiri1o3kgeqHS5YnJLlnJdKdowPjMbXX3VBBbkCOOuFct652s1GKUehO2YdRng49KdnG9UVy2zDZdDHiq5PYZ0Gzo1lmyxI2BHgqx0VOjViCjniFosrAIUrCwC1MZ4BAFkUrmODmEtcMiMwpwm4u0Cdbo+gdG9ufaAWuFJGgE0ycMqjdyXc0up96qfKOnp8/Xs+TbMi1mqgbxQTpEtjqkJug8kEU7BSJFdwZ7s0x2xctvn9Na8+JQWLwostLAGn67kuRwds5LbcPwt3mp9/rgmb8crKrDYqSNGojJPMkfIoQTkrE9oWW5bYzvFP+QUa8RS5+JM6Gexgurv90NtSXkyfX4TzLJQhwzGfEaqfBW8loebBrv3eqdlTlaosG4jNBAFrCw1bl6c0iqSsHaFgjtABNWSD4XtNHDv1HBZ8+mjl34fZoz5MEcip/R90Ys8log7LpL35S4BwI4GlfNcfJqdXp59M9/7/AFOXknnwSqT27AM2zP8Akj7g4e6kva0lzFC+3z8iq27VtZb2Sxo4Nx86qMvamWWypCetyPjY55weSXOJc4gg3u0cc6XsjxWScut3J39Shzk3bFJmEaEJoEgG0KdE1EvgZioTJpHR7NjwWaSJpGkVFIYq9+KtSA5tysKSKJgQQmMiiY6JAUhHY9BnRNa+rmiQnIkA3QMKV4krrez3BRe+5r0zjG2+Trm00NeS6Vm9SvggkIJoguRQ6BJTGRhmTh9ZJPYL7IqfV5pSg3e5Ql5klS3GWMAFEmyN3uU2oVwS4JQfkYVrs16XgB9e6mbITqJdZLP9487msb5kn1CS7lcp2Y/SWOksTt1K/wCpD5IuXB0DWVaOSkySl2L2s1SKWzzGUw7x8kEeoBzapkrBa7+yBMi5TEZbt3LgjgrvcCUNeCx4vDzHEKGXDDNHpmtgnCOSPTLg5XbtnNnyxafhPseK8zqdC8M6e6fDODqNM8Uq7GTBtgtOIqFR7oqjEal2nG7QV4iiFjki5pNCkrm6qasgolcsDaVClZOIEWaTJG7YH4KmSJIdMiSiSFHSYqyhGEhmc9VMZ5BJHqKSGWNamIK6mDOj6Pbeihj6t7SMSbzca13hdLS6uGOHRJfU04M6gqaOgs+2oJCA2UVOQNW+q6ENTinspG2Gpxvax8q80WCT3lAwhHqc0mkQb8iq1W1sZDAfvHZClSP1EbgqMuaKfRe78v1KpzTah3G4Rh81auC2T7FMhq7kmkSXAlZmXnOdTU07sP8AsiN0Wt0qCsTcXne6n+nD5KRFt2YnS6Otw/zD0KXcFwaex5b0bTvCn2JNjrdyiiMuQiEEGUvOvimiSK3CqBlZfQpiogkOyzQIQ2zGHwva78pI3hwxBVGqgp4mmU5oqUGmfPurXmji1sRRSsEC1xyqmTLmuUQGIWpEXI0LJMclCSJRY42WqiTKXMNU7RG0ZVEyhEUTJBUTJIINTGG0JgHRAmA5qZEAoEalk6TWiNobVrgMr4JNN1arXDXZYquS+GqyRVD0XTR4GMLSd4cR5Yq9e0pd4/mWrXS7om09LpnNNxrWYYU7R8Th5KjJ7RyydR2/MrlrZy42GOhUReZJnkucTdqTU73H08Fq9nQ2lkfL2NOijdzZ2Bd5LomyhGWSjC7gSnwWrk9Ay4wA5gY88yfNHyC7I2d8AO/HxqU+w2ZPShvYaf1HzCBor6OT9i7qD5KSA3aJdxPgkFBEpmwx+igELl+7wTJcgtcHcCgV0K7Ql6ljpCCbug1xp7qrNlWODkyrJlUYuRydr25LID+EHQfNcXNrss9lsjmZNXknxsZEj1iKOxQHIIpkgJ2Oy+Nm9IW4wx9EqChmxtLnJS2GnRrBoaqrHZUZAihUZNFcRRLWoJJBXUEgw1ABhqkAdECAc1BEpe1MRRIaIqyLYAB1SYF9nIyKjJEWdz0QAbCafnd7LvezneBfNnY0O+L6mvaJMKb81to2pblEzgS1lczWnBuJ87vik6uiMpUHbT2SBqKeKY0HBg3kE2T7CO1IrzQDv9kLkaMKWJ0JJB0JBUckumLfkRk+lNmlsnb7JGi92Xag5V4FZMGvxZFUnTMuLVRmt9maxeKVGIW1GjkB5qEN1yK6FI21NQQeRQmnwHUnwU7YtnUxmQNBIoBXidVTqMvusbkivLk6IORy20Okr5WFlwNBz18Fyc2tnlh01RzZ6qU41RimVc8ylDoy7JSTJBxw0IqgdDb4aBQsjYEYqm2NyL44KlJyIuRpsc2MKtuyPUC60XkVRagbyB2LdWrRE3EDQYYgZIamBN1MCQExEPSEUuQRZmOl/wD0XT+XDnmrP+BB8jZYqwIuoGb3RzbbYSWymjXa7j+636HOsdxlwzXpM6xtp8M25+kMAxDi47gD6lb5a7DFc2bnq8a7g9GbT10ksjsxQAflZiad59FDSZfeylN8/oirFl95Ny/A1pMXVW822XvFGpdyaYtKOyOfspdwvcxOlVqa2Es/G7LgNSsOvzqGPp7sy6rKoQruzmtjy0N0rzuSNnLizTtzntbVjiDwJCWPLOPEmvqSba4YFg2m94uucTzKoz5cjdSk39RqTlyzJtznRvqxxbyJHoteHJJLwuiuVxdphHabpG3ZXFw0qrMmbLPaUrISyTls2ZkihZGwoIqkVyQM22TMYPh8FU02RsrZboycRTmoyi0Nth2mEEVaoxn5kRGBmNFa3sAL5rju5NK0FFE9pLlJRoEqHLPUhQZYmaN0KhzFbKQFqLCaIAkBMLPFMQxDY3uFQ0034Dwqr4afJNXFDHLHsGV+5vPH0V0dFkfOwUVWjY5aSC8eBU/sEvvEuhiUuz5BpXkVVPR5Y9r+RHoZym2WPZPfoezdOWgGKztOOzRU4mxZ52vbeaefDgVWMx9pbXNbkQ4Xt5OjfmrIKL5EadjsYaKntO1J38EpSsBu6oEjf6IWu497XYBwFD+oVw810PZ2ojGbxvubNM1HnudTNMxjbz3BozxK7M5xgrk6NspqK3MG29KWVpGwuA1JpXkFz5+0Yp+FWZ3rUtkhe0dJqsoyOjq4VNRj6qE/aW3hjuRlrdtluc460GQuc443iMTU4GmAHMclzcvVKVt/iYJzlJ2yuOWhJApRxGedCR7FKcKQJ0ajNpgscXMdQOc2oxrdDiTjQDBp13KDwbqmW9QkJWseSKkfeE4ZXM/H2UJabrq35fmKMqPbRnY4fiBBp8OF7HLeOyceITxYZRjbYTaYhGzEDerKKmS4sIwNcsqUxyoa0xwpvqFL3TuiKTJEjKVrhvw0JGGOOn+ob0e6ZItfMKZ41pSlaYE4+BwVaxSe5GmKEAHXGmm8tA13uCm8THQ/ZJ2tNLxIw033cc8B2wq8mmYUXtkYXVaHVocKAE9mu/DvUfctKmyNGdb3NcWuxFWk0plgCMe8K/HiaRJICGHHWlaDInXPKgwKJQ7CY/FMxo/FUcBucSc9zTx4KDwSe1jQ1HaGkajEjEY1BIOXJYckHGVDJC1lp4Ji7kpoGSUxHSWP8P8AK30XoIfCgXY6CwDA/WiXYn/yOVt5+8KnE0eRUz3VgibQOz9b1XJXdlfmcDS7O8NwFHYDAZbgvPZ0lN0Zp/EZp/xI/wDyN9QoYyPY60JkiQkMamwjFN6y4/jLZ8CjpHO+Ik8yStzk5Pdldt8gqImSckmI9AFFvYTPShSQI1NkgFtDiqcj3L4C+1xiOark2kNclsrR1eQyVeFuyWTgxGZrcZmN0wUG2VoVtH135pJuyRRCm2Aw9o9PQKy3+Qw4hi3mfT9goyb6QZv2RooMPqlFgm3ZV3MHaAF/64rZib6SYUbQcwi3YpDcTR9eChJsIcijziVnY2f/2Q==" alt="" height="100" width="100"></v-img>
            </v-avatar>
            <div class="ml-4">
              <h1 class="text-h6 font-weight-bold">{{ user.name }}</h1>
              <p class="text-caption">{{ user.email }}</p>
            </div>
          </div>
          <v-btn @click="toggleSuivi" :class="{ 'suivi': estSuivi }">
    {{ estSuivi ? 'Ne plus suivre' : 'Suivre' }}
  </v-btn>
              </v-container>

        <!-- Onglets -->
        <v-card>
          <v-tabs v-model="tab" bg-color="white">
            <v-tab value="one">Activité</v-tab>
            <v-tab value="two">Informations</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="one">
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
                <v-card flat class="pa-4">
                  <h3 class="text-h4 font-weight-bold mb-4"></h3>
                  <v-row>
                    <v-col cols="12" md="6" lg="4" v-for="card in cards" :key="card.title">
                      <v-card class="rounded-lg shadow-sm" :color="card.color" dark>
                        <v-card-title>
                          <v-icon size="36" class="mr-2">{{ card.icon }}</v-icon>
                          <span class="text-h6 font-weight-semibold">{{ card.title }}</span>
                        </v-card-title>
                        <v-card-subtitle class="text-h4 font-weight-bold">{{ card.value }}</v-card-subtitle>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tabs-window-item>
              <v-tabs-window-item value="two">
                <h2>Informations</h2>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      tab: 'one', // Définissez l'onglet par défaut ici
      estSuivi: false,
      user: {
      name: '',
      email: '',
      avatar: ''
    },
      cards: [
        { title: "Questions", value: "125", icon: "mdi-comment-question-outline", color: "var(--v-card-base)" },
        { title: "Réponses", value: "342", icon: "mdi-check-circle-outline", color: "var(--v-card-base)" },
        { title: "Réponses validées", value: "87", icon: "mdi-thumb-up-outline", color: "var(--v-card-base)" },
        { title: "J'aime reçus", value: "1.2K", icon: "mdi-heart-outline", color: "var(--v-card-base)" },
        { title: "Abonnés", value: "456", icon: "mdi-account-outline", color: "var(--v-card-base)" },
      ],
      activeFab: {
        icon: 'mdi-plus',
        color: 'pink'
      }
    };
  },
  methods: {
    toggleSuivi() {
      this.estSuivi = !this.estSuivi; // Inverser l'état du suivi

      // Ici, vous pouvez envoyer une requête au serveur pour enregistrer le changement de suivi
      // Utilisez Vue Resource, Axios ou Fetch API pour effectuer une requête HTTP

      // Exemple avec Axios
      // Remplacez par votre URL et payload appropriés
      axios.post('http://127.0.0.1:8000/api/follow', { action: this.estSuivi ? 'suivre' : 'ne_plus_suivre' })
        .then(response => {
          console.log(response.data); // Gérer la réponse du serveur si nécessaire
        })
        .catch(error => {
          console.error('Erreur lors de la requête AJAX :', error);
          // Gérer les erreurs d'une manière appropriée
        });
    },
  
  },

  mounted() {
    const userId = this.$route.params.userId;
    console.log('User ID:', userId);
    axios.get(`http://127.0.0.1:8000/api/user-details/${userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
      });

      axios.get(`http://127.0.0.1:8000/api/user-stats/${userId}`)
      .then(response => {
        this.cards[0].value = response.data.questions_count;
        this.cards[1].value = response.data.answers_count;
        this.cards[2].value = response.data.valid_answers_count;
        this.cards[3].value = response.data.likes_count;
        this.cards[4].value = response.data.followers_count;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques utilisateur :', error);
      });
  }
};

</script>

<style scoped>
.text-muted-foreground {
  color: var(--v-muted-foreground-base);
}
.border-bottom {
  border-bottom: 1px solid var(--v-border-base);
}
/* Ajustement de la hauteur de l'app bar */
.v-app-bar {
  height: 100px;
}
.app-background {
    background-color:  rgb(238, 231, 231) !important;
    min-height: 100vh;
  }
</style>
