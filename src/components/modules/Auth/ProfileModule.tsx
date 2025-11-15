import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {API} from '@/lib/api';
import { services } from '@/lib/services';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

interface RegisterFormData {
  npm: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  fakultas: string;
  jurusan: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function ProfileModule() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState(null);
  const { register, handleSubmit, watch, formState: { errors }, reset} = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const password = watch('password');

  const getUserProfile = async() => {
    const {url, method} = services.user.profile();
    setIsLoading(true);
    await API({
        url,
        method
    }).then((res) => {
        const {data: data} = res.data;
        setUser(data);
        reset({
          email: data.email,
          npm: data.npm,
          nama_lengkap: data.nama_lengkap,
          jurusan: data.jurusan,
          fakultas: data.fakultas,
          jenis_kelamin: data.jenis_kelamin
        });
    }).catch((err) => {
        console.log(err);
        if(err instanceof AxiosError){
          toast.error(err.response.data.message);
        }
        if(err.response.status === 401){
          navigate('/login');
        }
    }).finally(() => {
       setIsLoading(false);
    })
  }

  useEffect(() => {
    getUserProfile();
  },[]) //eslint-disable-line



  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data;
    const {url, method} = services.user.update();

    await API({
      url,
      method,
      data: {...registerData, ...user}
    }).then((res) => {
      toast.success(res.data.message);
      navigate('/');
      reset();
      setShowPassword(false);
      setShowConfirmPassword(false);
    }).catch((err) => {
      console.log(err);
      if(err instanceof AxiosError){
        const {data: errors} = err.response;
        if(typeof errors !== "string"){
          toast.error(errors.message)
        } else {
          toast.error(errors)
        }
      }
    }).finally(() => {
      setIsLoading(false);
    })
    

  };

  const fakultasList = [
    'Fakultas Teknik',
    'Fakultas Ekonomi dan Bisnis',
    'Fakultas Hukum',
    'Fakultas Pertanian',
    'Fakultas Keguruan dan Ilmu Pendidikan',
    'Fakultas Ilmu Sosial dan Ilmu Politik',
    'Fakultas Matematika dan Ilmu Pengetahuan Alam',
    'Fakultas Ilmu Kesehatan'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-red-100">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto h-16 w-16 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <img src="/satgas.ico" alt="Satgas Logo" className="h-8 w-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Profil Akun Anda</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* NPM Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                NPM <span className="text-red-500">*</span>
              </label>
              <input
                {...register('npm', {
                  required: 'NPM wajib diisi setidaknya 8 karakter',
                  minLength: 8,
                  disabled: true
                })}
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                  errors.npm ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                }`}
                placeholder="Masukkan NPM (10 digit)"
              />
              {errors.npm && (
                <p className="text-red-500 text-sm mt-1">{errors.npm.message}</p>
              )}
            </div>

            {/* Nama Lengkap Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                {...register('nama_lengkap', {
                  required: 'Nama lengkap wajib diisi',
                  disabled: true,
                  minLength: {
                    value: 2,
                    message: 'Nama lengkap minimal 2 karakter',
                  }
                })}
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                  errors.nama_lengkap ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.nama_lengkap && (
                <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap.message}</p>
              )}
            </div>

            {/* Two Column Layout for Gender and Faculty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Jenis Kelamin Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('jenis_kelamin', {
                    disabled: true,
                    required: 'Jenis kelamin wajib dipilih'
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                    errors.jenis_kelamin ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenis_kelamin && (
                  <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin.message}</p>
                )}
              </div>

              {/* Fakultas Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Fakultas <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('fakultas', {
                    disabled: true,
                    required: 'Fakultas wajib dipilih'
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                    errors.fakultas ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <option value="">Pilih fakultas</option>
                  {fakultasList.map((fakultas, index) => (
                    <option key={index} value={fakultas}>{fakultas}</option>
                  ))}
                </select>
                {errors.fakultas && (
                  <p className="text-red-500 text-sm mt-1">{errors.fakultas.message}</p>
                )}
              </div>
            </div>

            {/* Jurusan Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Jurusan <span className="text-red-500">*</span>
              </label>
              <input
                {...register('jurusan', {
                  disabled: true,
                  required: 'Jurusan wajib diisi'
                })}
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                  errors.jurusan ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                }`}
                placeholder="Masukkan jurusan"
              />
              {errors.jurusan && (
                <p className="text-red-500 text-sm mt-1">{errors.jurusan.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('email', {
                    required: 'Email wajib diisi',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Format email tidak valid'
                    }
                  })}
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                  }`}
                  placeholder="Masukkan alamat email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Fields - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password wajib diisi',
                      minLength: {
                        value: 6,
                        message: 'Password minimal 6 karakter'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 pr-10 ${
                      errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                    }`}
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Konfirmasi Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword', {
                      required: 'Konfirmasi password wajib diisi',
                      validate: (value) => value === password || 'Password tidak sama'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 pr-10 ${
                      errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                    }`}
                    placeholder="Ulangi password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showConfirmPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                    </svg>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Perbarui Data'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}