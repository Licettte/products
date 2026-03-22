import clsx from 'clsx'
import { useLoginForm } from 'features/auth/model/hooks/useLoginForm'
import EyeIcon from 'shared/assets/EyeIcon.svg?react'
import EyeOffIcon from 'shared/assets/EyeOffIcon.svg?react'
import LockIcon from 'shared/assets/LockIcon.svg?react'
import LogoMainIcon from 'shared/assets/LogoMainIcon.svg?react'
import UserIcon from 'shared/assets/UserIcon.svg?react'
import { ColorButton } from 'shared/ui/button'
import { TextButton } from 'shared/ui/button/textButton/TextButton'
import { Flex } from 'shared/ui/flex/Flex'
import { Input } from 'shared/ui/input/Input'

import styles from './LoginForm.module.scss'

export const LoginForm = () => {
  const {
    username,
    password,
    remember,
    isLoading,
    formError,
    fieldErrors,
    isPasswordVisible,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useLoginForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.wrapper}>
        <Flex align="center" dir="column">
          <button className={styles.logoButton} type="button">
            <LogoMainIcon className={styles.logoIcon} />
          </button>

          <h1 className={styles.title}>Добро пожаловать!</h1>
          <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
        </Flex>

        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            Логин
          </label>

          <Input
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Введите логин"
            leftIcon={<UserIcon />}
            aria-invalid={Boolean(fieldErrors.username)}
            className={clsx(styles.input, fieldErrors.username && styles.inputError)}
          />

          <span className={styles.error}>{fieldErrors.username ?? ''}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>

          <Input
            id="password"
            name="password"
            autoComplete="current-password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Введите пароль"
            leftIcon={<LockIcon />}
            rightIcon={
              <button
                type="button"
                className={styles.iconButton}
                onClick={togglePasswordVisibility}
                aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
            aria-invalid={Boolean(fieldErrors.password)}
            className={clsx(styles.input, fieldErrors.password && styles.inputError)}
          />

          <span className={styles.error}>{fieldErrors.password ?? ''}</span>
        </div>

        <label className={styles.remember}>
          <input type="checkbox" checked={remember} onChange={handleRememberChange} />
          <span>Запомнить данные</span>
        </label>

        <span className={styles.formError}>{formError}</span>

        <ColorButton
          type="submit"
          fullWidth
          height={44}
          radius={12}
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'Входим...' : 'Войти'}
        </ColorButton>

        <div className={styles.divider}>
          <span className={styles.line} />
          <span className={styles.dividerText}>или</span>
          <span className={styles.line} />
        </div>

        <div className={styles.footer}>
          <span className={styles.footerText}>Нет аккаунта?</span>

          <TextButton
            type="button"
            title="Создать"
            className={styles.createButton}
            onClick={(event) => event.preventDefault()}
          />
        </div>
      </div>
    </form>
  )
}
